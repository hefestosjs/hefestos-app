import { Request, Response, Next } from "core";

export type SessionType = {
  request: Request;
  response: Response;
  next: Next;
  user?: any;
  redirectPath: string;
};

export const Session = (props: SessionType, option: "login" | "logout") => {
  const { request, response, next, user, redirectPath } = props;

  if (option === "login") {
    request.session.regenerate(function (err) {
      if (err) next(err);

      request.session.user = user;
      request.session.save(function (err) {
        if (err) return next(err);

        response.redirect(redirectPath);
      });
    });
  }

  if (option === "logout") {
    request.session.user = null;
    request.session.destroy(function (err) {
      if (err) next(err);
      response.redirect(redirectPath);
    });
  }
};
