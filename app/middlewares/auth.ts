import { Request, Response, Next } from "core";

function isAuthenticated(request: Request, response: Response, next: Next) {
  if (request.isAuthenticated()) {
    return next();
  } else {
    response.redirect("/login");
  }
}

export { isAuthenticated };
