import { Component } from "preact";
import { useState } from "preact/hooks";
import { type Options, type YouTubePlayer } from "youtube-player/dist/types";
import Youtube from "../../../lib/preact-youtube";
import { origin } from "../shared";

export function Page(_props: { url: string }) {
	const [player, setPlayer] = useState<YouTubePlayer | null>(null);
	const [playing, setPlaying] = useState(false);

	return (
		<div>
			<YoutubeWrapper
				id={new URLSearchParams(location.search).get("v") || "4AGSRqAdl94"}
				onReady={setPlayer}
				onStateChange={(e) => {
					switch (e) {
						case -1:
							console.log("unstarted");
							break;
						case 0:
							console.log("ended");
							break;
						case 1:
							console.log("playing");
							break;
						case 2:
							console.log("paused");
							break;
						case 3:
							console.log("buffering");
							break;
						case 5:
							console.log("video cued");
							break;
					}
				}}
			/>
			<button
				onClick={async () => {
					console.log("player", player);
					if (player) {
						if (playing) {
							await player.pauseVideo();
						} else {
							await player.playVideo();
						}
						setPlaying(!playing);
					}
				}}>
				{playing ? "Pause" : "Play"}
			</button>
		</div>
	);
}

interface YoutubeWrapperProps {
	id: string;
	onReady(player: YouTubePlayer): void;
	onStateChange?(status: -1 | 0 | 1 | 2 | 3 | 5): void;
}

interface YoutubeWrapperState {
	player: YouTubePlayer | null;
	/**
	 * -2 (component not ready),
	 * -1 (unstarted),
	 * 0 (ended),
	 * 1 (playing),
	 * 2 (paused),
	 * 3 (buffering),
	 * 5 (video cued).
	 */
	status: -2 | -1 | 0 | 1 | 2 | 3 | 5;
}

class YoutubeWrapper extends Component<YoutubeWrapperProps, YoutubeWrapperState> {
	opts: Options;
	state: YoutubeWrapperState = {
		player: null,
		status: -2,
	};

	constructor(props?: YoutubeWrapperProps) {
		super(props);
		this.opts = {
			height: "200",
			width: "200",
			playerVars: {
				// https://developers.google.com/youtube/player_parameters
				autoplay: 0,
				controls: 0,
				disablekb: 1,
				origin,
			},
		};
	}

	render(props: YoutubeWrapperProps) {
		return (
			<Youtube
				videoId={props.id}
				opts={this.opts}
				onReady={(e) => {
					this.setState({ player: e.target });
					props.onReady(e.target);
				}}
				onStateChange={(e) => {
					this.setState({ status: e.data as -1 | 0 | 1 | 2 | 3 | 5 });
					if (props.onStateChange) {
						props.onStateChange(e.data as -1 | 0 | 1 | 2 | 3 | 5);
					}
				}}
				onError={(e) => {
					console.error("error", e);
				}}
			/>
		);
	}
}
