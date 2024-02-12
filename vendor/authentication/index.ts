import auth from "./auth";
import { join } from "path";
import { registerMiddleware } from "core";
import session, { SessionOptions } from "express-session";
import { isProd } from "@/core/src/global";
// import connectRedis from 'connect-redis';
// import redis from 'redis';

// const RedisStore = connectRedis(session);
// const redisClient = redis.createClient();

const authConfigPath = join(process.cwd(), isProd, "app/config/auth");
const authConfig = require(authConfigPath);

const strategy: "web" | "token" = authConfig.default.strategy;
const passportConfig = auth(strategy);

const sessionOptions: SessionOptions = {
  /**
   * Session storage (commented for using default in-memory storage)
   * Example usage with Redis store:
   *   store: new RedisStore({ client: redisClient }),
   */

  /**
   * Secret key to sign the session cookie
   */
  secret: process.env.SESSION_SECRET || "session_secret",

  /**
   * Determines if the session should be saved even if it hasn't been modified during the request
   */
  resave: true,

  /**
   * Determines if a session will be saved even if it is uninitialized
   */
  saveUninitialized: true,

  /**
   * Settings related to the session cookie
   *
   * Example settings:
   *   - If set to true, the cookie will only be sent over HTTPS connections
   *     (Recommended to set as true in production environments with HTTPS)
   *   - Cookie lifespan in milliseconds (1 day in this example)
   */
  /**
   * Example settings for the session cookie:
   *   cookie: {
   *    secure: process.env.NODE_ENV === 'production',
   *    maxAge: 86400000,
   *   }
   */
};

registerMiddleware(session(sessionOptions));
registerMiddleware(passportConfig.initialize());

if (strategy === "web") {
  registerMiddleware(passportConfig.session());
}
if (strategy === "token") {
  registerMiddleware(passportConfig.authenticate("jwt", { session: false }));
}
