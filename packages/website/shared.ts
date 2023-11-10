/// <reference path="../../node_modules/bun-types/types.d.ts" />
import { type App } from "backend/src";

export const isDev = import.meta.env.DEV;
export const origin = import.meta.env.DEV ? "http://localhost:5173" : "https://musicist.uk";
const url = import.meta.env.DEV ? "http://localhost:3000" : "https://api.musicist.uk";

type Routes = App["schema"];

type GetRoutes = {
	[P in keyof Routes]: "get" extends keyof Routes[P] ? P : never;
}[keyof Routes];

type PostRoutes = {
	[P in keyof Routes]: "post" extends keyof Routes[P] ? P : never;
}[keyof Routes];

type GetResponse<Path extends GetRoutes> = Routes[Path]["get"]["response"][keyof Routes[Path]["get"]["response"]];

type PostResponse<Path extends PostRoutes> =
	Routes[Path]["post"]["response"][keyof Routes[Path]["post"]["response"]];

export const api = {
	async get<Path extends GetRoutes>(
		path: Path | `${Path}?${string}`,
		stuff?: RequestInit,
	): Promise<Awaited<GetResponse<Path>>> {
		const res = await fetch(url + path, stuff);
		if (!res.ok) throw new Error("Error with GET request: " + res.status + " " + res.statusText);
		return (await res.json()) as Awaited<GetResponse<Path>>;
	},
	async post<Path extends PostRoutes>(
		path: Path | `${Path}?${string}`,
		body?: BodyInit,
		stuff?: RequestInit,
	): Promise<Awaited<PostResponse<Path>>> {
		const res = await fetch(url + path, {
			method: "POST",
			body,
			...stuff,
		});
		if (!res.ok) throw new Error("Error with POST request: " + res.status + " " + res.statusText);
		return (await res.json()) as Awaited<PostResponse<Path>>;
	},
};
