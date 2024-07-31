const path = require("path");
const { execSync } = require("child_process");

const env = process.env.NODE_ENV;
const isProd = env === "production" ? "dist" : "";

const scriptPath = path.join(process.cwd(), isProd, "core/scripts.js");
const [, , script] = process.argv;

execSync(`node ${scriptPath} ${script}`, { stdio: "inherit" });
