import {
  Router as ExpressRouter,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from "express";

export interface RequestInterface extends ExpressRequest {}
export interface ResponseInterface extends ExpressResponse {}
export interface NextInterface extends ExpressNextFunction {}

export interface Controller {
  index?(req: RequestInterface, res: ResponseInterface): void;
  show?(req: RequestInterface, res: ResponseInterface): void;
  create?(req: RequestInterface, res: ResponseInterface): void;
  store?(req: RequestInterface, res: ResponseInterface): void;
  edit?(req: RequestInterface, res: ResponseInterface): void;
  update?(req: RequestInterface, res: ResponseInterface): void;
  destroy?(req: RequestInterface, res: ResponseInterface): void;
}

export interface RouterInterface extends ExpressRouter {
  resources(path: string, controllerName: string): RouterInterface;
}
