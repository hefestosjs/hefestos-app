import { Request, Response, Next } from "core";
import AuthConfig from "app/config/auth";

function isAuthenticated(request: Request, response: Response, next: Next) {
  if (AuthConfig.strategy === "web") {
    if (!request.session.user) next("route");

    next();
  }
}

export { isAuthenticated };
