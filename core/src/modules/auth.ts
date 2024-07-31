import { Express } from "express";
import session from "express-session";
import RedisStore from "connect-redis";
import { v4 as randomUUI } from "uuid";
import { redisClient } from "./redis";
import { join } from "path";
import { isProd } from "../global";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any } | null;
  }
}

const performanceConfigPath = join(
  process.cwd(),
  isProd,
  "app/config/performance"
);
const performance = require(performanceConfigPath).default;

const authConfigPath = join(process.cwd(), isProd, "app/config/auth");
const auth = require(authConfigPath).default;

const securityPath = join(process.cwd(), isProd, "app/config/security");
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
