import pc from "picocolors";
import { devLog } from "../dev";

type Mode = "development" | "production";

export function roge() {
	let currentMode: Mode = "development";
	let currentPort = 3000;

	return {
		config({
			mode = "development",
			port = 3000,
		}: {
			port?: number;
			mode?: Mode;
		}) {
			currentMode = mode;
			currentPort = port;
			return this;
		},
		start() {
			try {
				Bun.serve({
					port: currentPort,
					async fetch(req) {
						return new Response("Hello world");
					},
				});
				if (currentMode === "development")
					devLog({
						message: `Server is running on http://localhost:${currentPort}`,
						type: "log",
					});
			} catch (error) {
				if (currentMode === "development")
					devLog({ message: `${error}`, type: "error" });
				process.exit(1);
			}
		},
	};
}
