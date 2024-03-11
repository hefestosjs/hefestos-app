import { Express } from "express";
import session from "express-session";
import RedisStore from "connect-redis";
import jwt from "jsonwebtoken";
import { v4 as randomUUI } from "uuid";
import { redisClient } from "./redis";
import { join } from "path";
import { isProd } from "../global";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any } | null;
  }
}

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
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
  });

  APP.use(
    session({
      store: redisStore,
      genid: () => randomUUI(),
      secret: process.env.SESSION_SECRET || "secret",
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      cookie: {
        secure: ssl, // if true only transmit cookie over https
        httpOnly: true, // if true prevent client side JS from reading the cookie
        maxAge: 90 * 24 * 60 * 60 * 1000, // session max age in miliseconds (3 months in this case)
      },
    })
  );
}
