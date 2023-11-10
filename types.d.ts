interface ObjectConstructor {
	entries<K extends string | number | symbol, V>(o: Record<K, V>): [K, V][];
	keys<K extends string | number | symbol>(o: Record<K, unknown>): K[];
	values<V>(o: Record<string | number | symbol, V>): V[];
}

interface Array<T> {
	includes(value: unknown): value is T;
}

interface ReadonlyArray<T> {
	includes(value: unknown): value is T;
}

interface Lyric {
	/** ms */
	from: number;
	/** ms */
	to: number;
	text: string;
}

interface SpotifySearchResponse {
	album: {
		album_type: string;
		artists: {
			external_urls: {
				spotify: string;
			};
			href: string;
			id: string;
			name: string;
			type: string;
			uri: string;
		}[];
		available_markets: string[];
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		images: {
			height: number;
			url: string;
			width: number;
		}[];
		name: string;
		release_date: string;
		release_date_precision: string;
		total_tracks: number;
		type: string;
		uri: string;
	};
	artists: {
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		name: string;
		type: string;
		uri: string;
	}[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
}

interface ReducedSpotfiySearchResponse {
	album: {
		spotify_url: string;
		href: string;
		id: string;
		images: {
			height: number;
			url: string;
			width: number;
		}[];
		name: string;
	};
	artists: {
		spotify_url: string;
		href: string;
		id: string;
		name: string;
	}[];
	duration_ms: number;
	explicit: boolean;
	spotify_url: string;
	href: string;
	id: string;
	name: string;
	needs_lyrics: boolean | "unknown";
	lyrics: boolean;
}
