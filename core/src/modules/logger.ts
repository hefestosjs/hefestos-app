import { Express } from "express";
import { join } from "path";
import morgan from "morgan";
import * as rfs from "rotating-file-stream";
import fs from "fs";
import { isProd } from "../global";

export default function Logger(APP: Express, ROOT_PATH: string) {
  if (process.env.LOG_ACTIVE === "true") {
    const datetime = new Date();
    const logName = datetime.toISOString().slice(0, 10);
    const logPath = join(ROOT_PATH, isProd, `app/logs/${logName}.log`);

    if (process.env.NODE_ENV === "production") {
      const rotateLogStream = rfs.createStream(`${logPath}`, {
        size: "5M", // rotate every 10 MegaBytes written
        interval: "1d", // rotate daily
        compress: "gzip", // compress rotated files
        path: logPath,
      });

      APP.use(morgan("combined", { stream: rotateLogStream }));
    } else {
      const logStream = fs.createWriteStream(logPath, { flags: "a" });

      APP.use(morgan("combined", { stream: logStream }));
    }
  }
}
