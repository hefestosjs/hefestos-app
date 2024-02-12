import passport from "passport";
import { Strategy as PassportJwtStrategy, ExtractJwt } from "passport-jwt";

export function JwtStrategy() {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SESSION_SECRET || "session_secret",
  };

  passport.use(
    new PassportJwtStrategy(jwtOptions, function (jwtPayload, done) {
      /**
       * JWT authentication logic
       * Typically, check credentials and call done(null, user) if authentication is successful.
       */
    })
  );
}
