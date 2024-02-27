import { Express } from "express";
import session from "express-session";
import { v4 as randomUUI } from "uuid";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any } | null;
  }
}

export default function Authentication(APP: Express, securityPath: string) {
  const security = require(securityPath).SecurityPolicy;

  APP.use(
    session({
      genid: () => randomUUI(),
      secret: randomUUI(),
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: security.ssl, // if true only transmit cookie over https
        httpOnly: true, // if true prevent client side JS from reading the cookie
        maxAge: 90 * 24 * 60 * 60 * 1000, // session max age in miliseconds (3 months in this case)
      },
    })
  );
}
