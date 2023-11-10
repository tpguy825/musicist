export function pick<Obj extends Record<Keys, unknown>, Keys extends string | number | symbol>(
	obj: Obj,
	keys: Keys[],
) {
	const ret = {} as Pick<Obj, Keys>;
	for (const key of keys) {
		ret[key] = obj[key];
	}
	return ret;
}

export function lrctolyrics(lrc: string): Lyric[] {
	// lrc is a string containing the contents of an lrc file
	// split lrc into lines
	const lines = lrc.split("\n");

	// map each line to an object
	const lyrics = lines.map((line, i): Lyric => {
		// split the line into its components
		const [time, text] = line.split("]");

		// split the time into its components
		const [min, sec] = time.replace("[", "").split(":");

		// convert the time to milliseconds
		const ms = parseInt(min) * 60 * 1000 + parseFloat(sec) * 1000;

		if (lines[i + 1]) {
			// split the line into its components
			const [nexttime] = lines[i + 1].split("]");

			// split the time into its components
			const [nextmin, nextsec] = nexttime.replace("[", "").split(":");

			// convert the time to milliseconds
			const nextms = parseInt(nextmin) * 60 * 1000 + parseFloat(nextsec) * 1000;
			// return the object
			return {
				// start of lyric
				from: ms,
				// end of lyric
				to: nextms,
				text: text.trim(),
			};
		} else {
			// return the object
			return {
				// start of lyric
				from: ms,
				// end of lyric
				to: -1,
				text: text.trim(),
			};
		}
	});

	// return the lyrics
	return lyrics;
}

export function lyricstolrc(lyrics: Lyric[]): string {
	// lyrics is an array of objects
	// map each object to a string
	const lrc = lyrics.map((lyric) => {
		// convert the milliseconds to a time string (mm:ss.ms)
		const time = `[${new Date(lyric.from).toISOString().substr(14, 5)}.${
			/* ms */ new Date(lyric.from).toISOString().substr(17, 2)
		}]`;

		// return the string
		return `${time} ${lyric.text}`;
	});

	// return the lrc
	return lrc.join("\n");
}
