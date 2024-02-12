import passport from "passport";
import { Strategy as PassportLocalStrategy } from "passport-local";

export function SessionStrategy() {
  passport.use(
    new PassportLocalStrategy(function (username, password, done) {
      /**
       * Local authentication logic
       * Typically, check credentials and call done(null, user) if authentication is successful.
       */
    })
  );

  passport.serializeUser(function (user, done) {
    /**
     * Serialization function - only the user ID is stored in the session
     * done(null, user.id);
     */
  });

  passport.deserializeUser(function (id, done) {
    /**
     * Deserialization function - retrieves user data using the stored ID
     * const user = // logic to retrieve the user from the database using the ID
     * done(null, user);
     */
  });
}
