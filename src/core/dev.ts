import pc from "picocolors";

interface DevLog {
	type: "error" | "success" | "warn";
	message: string;
}

export function devLog(logs: DevLog) {
	const { message, type } = logs;

	if (type === "success") console.log(pc.green(pc.bold(message)));
	else if (type === "warn") console.warn(pc.yellow(pc.bold(message)));
	else console.error(pc.red(pc.bold(message)));
}
