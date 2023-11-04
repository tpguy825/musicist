import preact from "@preact/preset-vite";
import ssr from "vike/plugin";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	plugins: [preact(), ssr({ prerender: true })],
});
