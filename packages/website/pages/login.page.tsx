import { useState } from "preact/hooks";

export function Page({ url }: { url: string }) {
	const [exampleinput, setExampleinput] = useState("");
	return (
		<div>
			Test <br />
			<br />
			{url}
			<br />
			<br />
			<input
				type="text"
				class="border-2 bg-white text-black"
				value={exampleinput}
				onInput={(e) => {
					console.log("input", e.currentTarget.value);
					setExampleinput(e.currentTarget.value);
				}}
			/>
		</div>
	);
}
