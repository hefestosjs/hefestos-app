import "dotenv/config";
import { join } from "path";
import express from "express";
import methodOverride from "method-override";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import Views from "./modules/views";
import Logger from "./modules/logger";
import Assets from "./modules/assets";
import Authentication from "./modules/auth";
import MethodOverride from "./modules/methodOverride";
import Compression from "./modules/compression";
import { isProd } from "./global";
import Cache from "./modules/cache";

export const APP = express();
export const APP_PORT = Number(process.env.PORT) || 3000;
export const registerMiddleware = APP.use;
export const security = join(process.cwd(), isProd, "app/config/security");

const routesPath = join(process.cwd(), isProd, "app/routes");
const contentSecurity = helmet.contentSecurityPolicy(
  require(security).SecurityPolicy
);

/**
 * Modules
 */
Logger(APP);
Views(APP);
Assets(APP);
Compression(APP);
Cache();
Authentication(APP);

/**
 * Express
 */
APP.use(helmet());
APP.use(contentSecurity);
APP.use(express.json());
APP.use(cookieParser(process.env.COOKIE_SECRET));
APP.use(express.urlencoded({ extended: true }));
APP.use(methodOverride(MethodOverride));
APP.use("/", require(routesPath).default);
APP.use((req, res, next) => res.status(404).render("404"));
