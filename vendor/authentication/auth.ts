import passport from "passport";
import { SessionStrategy } from "./strategies/session";
import { JwtStrategy } from "./strategies/jwt";

export default function auth(strategy: string) {
  if (strategy === "web") {
    SessionStrategy();
  } else if (strategy === "token") {
    JwtStrategy();

    return passport;
  } else {
    throw new Error("Authentication strategy invalid.");
  }

  return passport;
}
