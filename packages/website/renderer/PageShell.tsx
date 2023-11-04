import { PageContextProvider } from "./usePageContext";
import "./PageShell.css";
import { type ComponentChildren } from "preact";

export { PageShell };

function PageShell({ pageContext, children }: { pageContext: unknown; children: ComponentChildren }) {
	return <PageContextProvider pageContext={pageContext}>{children}</PageContextProvider>;
}
