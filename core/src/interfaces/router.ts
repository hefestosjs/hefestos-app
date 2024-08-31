import type {
  NextFunction as ExpressNextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
  Router as ExpressRouter,
  RequestHandler,
} from "express";

export type {
  ExpressRequest as RequestInterface,
  ExpressResponse as ResponseInterface,
  ExpressNextFunction as NextInterface,
};

export interface Controller {
  index?(req: ExpressRequest, res: ExpressResponse): void;
  show?(req: ExpressRequest, res: ExpressResponse): void;
  create?(req: ExpressRequest, res: ExpressResponse): void;
  store?(req: ExpressRequest, res: ExpressResponse): void;
  edit?(req: ExpressRequest, res: ExpressResponse): void;
  update?(req: ExpressRequest, res: ExpressResponse): void;
  destroy?(req: ExpressRequest, res: ExpressResponse): void;
}

export interface MiddlewareForMethod {
  method: string;
  middleware: RequestHandler | RequestHandler[];
}

export interface RouterInterface extends ExpressRouter {
  resources(
    path: string,
    controllerName: string,
    middlewares?: (RequestHandler | MiddlewareForMethod)[],
  ): RouterInterface;
}
