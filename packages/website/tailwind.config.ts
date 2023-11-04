import { type Config } from "tailwindcss";

export default {
	content: ["./pages/**/*.{html,js,ts,jsx,tsx}", "./index.html", "./renderer/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config;
