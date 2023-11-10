/// <reference path="../../../node_modules/bun-types/types.d.ts" />
import { promises as fs } from "fs";
import { inArray } from "drizzle-orm";
import { db } from "./db";
import { songs } from "./db/schema";
import { env } from "./env";
import { pick } from "./utils";

interface SpotifyToken {
	token: string;
	type: string;
	expiresat: number;
}

class Spotify {
	token: null | { token: string; type: string; expiresat: number } = null;
	async getToken() {
		if (await fs.exists("spotifytoken.json")) {
			const token = JSON.parse(await Bun.file("spotifytoken.json").text()) as SpotifyToken;
			if (token.expiresat > Date.now()) {
				this.token = token;
				return;
			}
		}
		const url = new URL("https://accounts.spotify.com/api/token");

		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization:
					"Basic " +
					Buffer.from(env.SPOTIFY_CLIENT_ID + ":" + env.SPOTIFY_CLIENT_SECRET).toString("base64"),
			},
			body: "grant_type=client_credentials",
		});
		if (!res.ok) throw new Error("Error with GET request: " + res.status + " " + res.statusText);
		const json = await res.json<{
			access_token: string;
			token_type: string;
			expires_in: number;
		}>();
		this.token = {
			token: json.access_token,
			type: json.token_type,
			expiresat: json.expires_in * 1000 + Date.now(),
		};

		await Bun.write("spotifytoken.json", JSON.stringify(this.token));
	}
	async search(query: string): Promise<ReducedSpotfiySearchResponse[]> {
		if (!this.token || this.token.expiresat < Date.now()) {
			console.log("Refreshing token");
			await this.getToken();
		}
		const url = new URL("https://api.spotify.com/v1/search");
		url.searchParams.append("q", query);
		url.searchParams.append("type", "track");
		url.searchParams.append("limit", "10");

		const res = await fetch(url, {
			headers: {
				Authorization: `${this.token!.type} ${this.token!.token}`,
			},
		});
		if (!res.ok) throw new Error("Error with GET request: " + res.status + " " + res.statusText);
		return await res
			.json<{
				tracks: {
					items: SpotifySearchResponse[];
				};
			}>()
			.then(async (r) => {
				const lyrics = await db
					.select({
						spotifyId: songs.spotifyId,
						lyrics: songs.lyrics,
						explicit: songs.explicit,
						needsLyrics: songs.needsLyrics,
					})
					.from(songs)
					.where(
						inArray(
							songs.spotifyId,
							r.tracks.items.map((e) => e.id),
						),
					)
					.all();
				return r.tracks.items.map((e): ReducedSpotfiySearchResponse => {
					const {
						lyrics: hasLyrics,
						explicit,
						needsLyrics,
					} = lyrics.find((l) => l.spotifyId === e.id) ?? {
						hasLyrics: false,
						explicit: e.explicit,
					};

					return {
						artists: e.artists.map((e) => ({
							...pick(e, ["href", "id", "name"]),
							spotify_url: e.external_urls.spotify,
						})),
						album: {
							...pick(e.album, ["album_type", "href", "id", "name"]),
							spotify_url: e.album.external_urls.spotify,
							images: e.album.images.map((e) => pick(e, ["height", "url", "width"])),
						},
						spotify_url: e.external_urls.spotify,
						lyrics: Boolean(hasLyrics && "length" in hasLyrics ? hasLyrics.length : hasLyrics),
						needs_lyrics: needsLyrics || (hasLyrics && "length" in hasLyrics ? true : "unknown"),
						explicit: Boolean(explicit === null ? e.explicit : explicit),
						...pick(e, ["duration_ms", "href", "id", "name"]),
					};
				});
			});
	}
}

export const spotify = new Spotify();
