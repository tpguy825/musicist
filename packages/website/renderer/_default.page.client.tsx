import { hydrate, type FunctionComponent } from "preact";
import { PageShell } from "./PageShell";

export { render };

// This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
function render<T>(pageContext: {
	Page: FunctionComponent<T & { url: string }>;
	pageProps: T;
	urlPathname: string;
}) {
	const { Page, pageProps } = pageContext;
	if (!Page) throw new Error("Client-side render() hook expects pageContext.Page to be defined");
	const root = document.getElementById("app");
	if (!root) throw new Error("DOM element #app not found");

	hydrate(
		<PageShell pageContext={pageContext}>
			<Page {...pageProps} url={pageContext.urlPathname} />
		</PageShell>,
		root,
	);
}

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vike.dev/clientRouting */
