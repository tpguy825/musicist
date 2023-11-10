import { lyricstolrc } from "./utils";

const data = {
	lyrics: {
		syncType: "LINE_SYNCED",
		lines: [
			{ startTimeMs: "10500", words: "So watchu got?", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "15280", words: "Yeah", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "18180", words: "I can\u0027t sleep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "21790", words: "Yeah", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "25800", words: "I\u0027mma toss and turn tonight", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "28130", words: "\u0027Cause i can\u0027t sleep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "29570", words: "No, i can\u0027t sleep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "32170", words: "I\u0027ll just lie awake tonight", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "34460", words: "\u0027Cause i can\u0027t sleep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "36620", words: "Without you beside me", syllables: [], endTimeMs: "0" },
			{
				startTimeMs: "38150",
				words: "Beside me, beside me, beside me, beside me",
				syllables: [],
				endTimeMs: "0",
			},
			{ startTimeMs: "41420", words: "Beside me, beside me, beside me", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "44780", words: "Beside me, beside me, beside me", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "49910", words: "But i can\u0027t sleep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "57060", words: "Yo", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "62780", words: "But i can\u0027t sleep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "69830", words: "Yo", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "75690", words: "But i can\u0027t sle-e-e-e-ep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "88050", words: "I can\u0027t, can\u0027t sleep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "115360", words: "I\u0027mma toss and turn tonight", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "117610", words: "\u0027Cause i can\u0027t sleep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "119180", words: "No, i can\u0027t sleep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "121970", words: "I\u0027ll just lie awake tonight", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "124190", words: "\u0027Cause i can\u0027t sleep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "126020", words: "Without you beside me", syllables: [], endTimeMs: "0" },
			{
				startTimeMs: "127900",
				words: "Beside me, beside me, beside me, beside me",
				syllables: [],
				endTimeMs: "0",
			},
			{ startTimeMs: "130830", words: "Beside me, beside me, beside me", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "134200", words: "Beside me, beside me, beside me", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "139460", words: "But i can\u0027t sleep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "145720", words: "Yo", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "158530", words: "Yo", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "164960", words: "But i can\u0027t sleep", syllables: [], endTimeMs: "0" },
			{ startTimeMs: "203810", words: "I can\u0027t sleep", syllables: [], endTimeMs: "0" },
		],
		provider: "MusixMatch",
		providerLyricsId: "127913246",
		providerDisplayName: "Musixmatch",
		syncLyricsUri: "",
		isDenseTypeface: false,
		alternatives: [],
		language: "en",
		isRtlLanguage: false,
		fullscreenAction: "FULLSCREEN_LYRICS",
		showUpsell: false,
	},
	colors: { background: -6725204, text: -16777216, highlightText: -1 },
	hasVocalRemoval: false,
};
const { lines } = data.lyrics;

console.log(
	lyricstolrc(
		lines.map((line, i): Lyric => {
			const nextLine = lines[i + 1];
			if (nextLine) {
				const nextLineStart = parseInt(nextLine.startTimeMs);
				const currentLineEnd = parseInt(line.endTimeMs);
				const gap = nextLineStart - currentLineEnd;
				if (gap > 0) {
					line.endTimeMs = nextLineStart.toString();
				}
			}

			return {
				from: parseInt(line.startTimeMs),
				to: parseInt(line.endTimeMs),
				text: line.words,
			};
		}),
	),
);
