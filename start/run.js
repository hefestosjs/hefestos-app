const path = require("node:path");
const { execSync } = require("node:child_process");

const env = process.env.NODE_ENV;
const isProd = env === "production" ? "dist" : "";

const scriptPath = path.join(process.cwd(), isProd, "core/scripts.js");
const [, , script, ...args] = process.argv;

const fullCommand = `node ${scriptPath} ${script} ${args.join(" ")}`;
execSync(fullCommand, { stdio: "inherit" });
