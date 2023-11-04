import preact from "@preact/preset-vite";
import ssr from "vike/plugin";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact(), ssr({ prerender: true })],
});
