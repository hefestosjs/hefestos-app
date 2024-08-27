import { join } from "node:path";
import RedisStore from "connect-redis";
import type { Express } from "express";
import session from "express-session";
import { v4 as randomUUI } from "uuid";
import { isProd } from "../global";
import { redisClient } from "./redis";

declare module "express-session" {
	export interface SessionData {
		user: { [key: string]: any } | null;
	}
}

const basePath = join(process.cwd(), isProd);

const performanceConfigPath = join(basePath, "app/config/performance");
const performance = require(performanceConfigPath).PerformanceConfig;

const authConfigPath = join(basePath, "app/config/auth");
const auth = require(authConfigPath).default;

const securityPath = join(basePath, "app/config/security");
const security = require(securityPath).SecurityPolicy;

export default function Authentication(APP: Express) {
	if (auth.strategy === "web") {
		useSession(APP, security.ssl);
	}
}

function useSession(APP: Express, ssl: boolean) {
	const sessionObject = {
		genid: () => randomUUI(),
		secret: auth.sessionStrategy.secret,
		resave: auth.sessionStrategy.resave,
		saveUninitialized: auth.sessionStrategy.saveUninitialized,
		cookie: {
			secure: ssl, // if true only transmit cookie over https
			httpOnly: auth.sessionStrategy.cookie.httpOnly,
			maxAge: auth.sessionStrategy.cookie.maxAge,
		},
	};

	if (performance.redis) {
		const redisStore = new RedisStore({
			client: redisClient,
			prefix: auth.sessionStrategy.prefix,
		});

		return APP.use(session({ ...sessionObject, store: redisStore }));
	}

	return APP.use(session(sessionObject));
}
