// `usePageContext` allows us to access `pageContext` in any Preact component.
// See https://vike.dev/pageContext-anywhere

import { createContext, type ComponentChildren } from "preact";
import { useContext } from "preact/hooks";

export { PageContextProvider };
export { usePageContext };

const Context = createContext<unknown>(undefined);

function PageContextProvider({ pageContext, children }: { pageContext: unknown; children: ComponentChildren }) {
	return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
	const pageContext = useContext(Context);
	return pageContext;
}
