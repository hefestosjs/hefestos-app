import "dotenv/config";
import express from "express";
import methodOverride from "method-override";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import Views from "./modules/views";
import Logger from "./modules/logger";
import Assets from "./modules/assets";
import MethodOverride from "./modules/methodOverride";
import { join } from "path";
import { isProd } from "./global";

export const APP = express();
export const APP_PORT = Number(process.env.PORT) || 3000;

const routesPath = join(process.cwd(), isProd, "app/routes");

/**
 * Modules
 */
Views(APP, process.cwd());
Logger(APP, process.cwd());
Assets(APP, process.cwd());

/**
 * Express
 */
APP.use(helmet());
APP.use(express.json());
APP.use(cookieParser(process.env.COOKIE_SECRET));
APP.use(express.urlencoded({ extended: true }));
APP.use(methodOverride(MethodOverride));
APP.use("/", require(routesPath).default);
APP.use((req, res, next) => res.status(404).render("404"));
