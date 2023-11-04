interface Lyric {
	from: LyricTimestamp;
	to: LyricTimestamp;
	text: string;
}

interface LyricTimestamp {
	hour?: number;
	minute: number;
	second: number;
}

type DeezerTrackID = number & Omit<{ _: never }, "_">;
type DeezerArtistID = number & Omit<{ _: never }, "_">;
type DeezerAlbumID = number & Omit<{ _: never }, "_">;

interface DeezerSearchResult {
	data: Data[];
	total: number;
}

interface Data {
	id: DeezerID;
	readable: boolean;
	title: string;
	title_short: string;
	title_version: string;
	link: string;
	duration: number;
	rank: number;
	explicit_lyrics: boolean;
	explicit_content_lyrics: number;
	explicit_content_cover: number;
	preview: string;
	md5_image: string;
	artist: Artist;
	album: Album;
	type: string;
}

interface Album {
	id: DeezerAlbumID;
	title: string;
	cover: string;
	cover_small: string;
	cover_medium: string;
	cover_big: string;
	cover_xl: string;
	md5_image: string;
	tracklist: string;
	type: string;
}

interface Artist {
	id: DeezerArtistID;
	name: string;
	link: string;
	picture: string;
	picture_small: string;
	picture_medium: string;
	picture_big: string;
	picture_xl: string;
	tracklist: string;
	type: string;
}
