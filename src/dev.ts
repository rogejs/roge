import pc from "picocolors";

type TypeLog = "error" | "warn" | "log";

export function devLog({
	type = "log",
	message,
}: {
	type?: TypeLog;
	message: string;
}) {
	if (type === "log") console.log(pc.green(pc.bold(message)));
	else if (type === "warn") console.warn(pc.yellow(pc.bold(message)));
	else console.error(pc.red(pc.bold(message)));
}
