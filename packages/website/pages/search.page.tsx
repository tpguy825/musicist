import { useEffect, useState } from "preact/hooks";
import { api } from "../shared";

export function Page(_props: { url: string }) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<ReducedSpotfiySearchResponse[]>([]);

	function update() {
		console.log(query);
		if (query.trim().length > 0)
			api.post(`/search?q=${query}`)
				.then((res) => {
					setResults(res);
				})
				.catch(console.error);
		else if (results.length > 0) setResults([]);
	}

	useEffect(update, [query]);
	useEffect(update, []);

	return (
		<div class="m-4">
			<input
				type="text"
				placeholder="Search for a song..."
				value={query}
				onInput={(e) => setQuery(e.currentTarget.value)}
				class="mb-4 w-full rounded-md border border-zinc-600 px-4 py-2"
			/>
			<ul>
				{results.map((r) => (
					<li class="relative mb-2 flex rounded-xl border border-zinc-600" key={r.id}>
						<img
							src={r.album.images[1].url || r.album.images[0].url}
							aria-describedby={"search-track-" + r.id}
							class="w-16 rounded-xl border-y border-l border-zinc-600"
						/>
						<span id={"search-track-" + r.id} class="my-auto ml-4">
							<span class="text-xl">{r.name}</span>
							<br />
							<span class="text-zinc-500">
								{r.artists.map((a) => a.name).join(", ")} - {r.album.name}
							</span>
						</span>
						<span class="py-auto absolute right-4 top-5 block text-zinc-500">
							{r.lyrics ? "Has lyrics" : "No lyrics found"}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
