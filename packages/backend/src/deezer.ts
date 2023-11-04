import { env } from "./env";

export const deezer = {
	async search(query: string) {
		const url = new URL("https://deezerdevs-deezer.p.rapidapi.com/search");
		url.searchParams.append("q", query);
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": env.RAPIDAPI_KEY,
				"X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
			},
		});
		const result: DeezerSearchResult = await response.json();
		return result;
	},
};
