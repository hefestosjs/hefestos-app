import fs from "node:fs";
import { join } from "node:path";
import type { Express } from "express";
import morgan from "morgan";
import * as rfs from "rotating-file-stream";
import { isProd } from "../global";

export default function Logger(APP: Express) {
	const logsConfigPath = join(process.cwd(), isProd, "app/config/logs");
	const logsConfig = require(logsConfigPath).default;

	if (logsConfig.active === true) {
		const datetime = new Date();
		const logName = datetime.toISOString().slice(0, 10);

		if (process.env.NODE_ENV === "production") {
			const logPath = join(`dist/app/logs/${logName}`);
			const rotateLogStream = rfs.createStream(`${logName}.log`, {
				size: logsConfig.env.production.size,
				interval: logsConfig.env.production.interval,
				compress: logsConfig.env.production.compress,
				path: logPath,
			});

			APP.use(
				morgan(logsConfig.env.production.format, { stream: rotateLogStream }),
			);
		} else {
			const logPath = join(`app/logs/${logName}.log`);
			const logStream = fs.createWriteStream(logPath, { flags: "a" });

			APP.use(morgan(logsConfig.env.development.format, { stream: logStream }));
		}
	}
}
