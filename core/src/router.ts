import { join } from "node:path";
import { Router as ExpressRouter, type RequestHandler } from "express";
import type {
  Controller,
  MiddlewareForMethod,
  RouterInterface,
} from "./interfaces/router";
import { formatRoutePath } from "./utils/formatRoutePath";

export function Router(): RouterInterface {
  const router = ExpressRouter() as RouterInterface;

  router.resources = (path, controllerName, middlewares = []) => {
    const routePath = formatRoutePath(path);
    const controllerPath = join(process.cwd(), "app/controllers");
    const controllerFile = `${controllerPath}/${controllerName}`;
    const controller: Controller = require(controllerFile).default;

    const getMiddlewares = (method: string) => {
      const commonMiddlewares = middlewares.filter(
        (mw): mw is RequestHandler => typeof mw === "function",
      );

      const specificMiddlewares = middlewares
        .filter(
          (mw): mw is MiddlewareForMethod =>
            typeof mw === "object" && "method" in mw && mw.method === method,
        )
        .flatMap((mw) => mw.middleware);

      return [...commonMiddlewares, ...specificMiddlewares];
    };

    if (controller.index) {
      router.get(routePath, ...getMiddlewares("index"), controller.index);
    }

    if (controller.show) {
      router.get(
        `${routePath}/details/:id`,
        ...getMiddlewares("show"),
        controller.show,
      );
    }

    if (controller.create) {
      router.get(
        `${routePath}/create`,
        ...getMiddlewares("create"),
        controller.create,
      );
    }

    if (controller.store) {
      router.post(routePath, ...getMiddlewares("store"), controller.store);
    }

    if (controller.edit) {
      router.get(
        `${routePath}/edit/:id`,
        ...getMiddlewares("edit"),
        controller.edit,
      );
    }

    if (controller.update) {
      router.put(
        `${routePath}/:id`,
        ...getMiddlewares("update"),
        controller.update,
      );
    }

    if (controller.destroy) {
      router.delete(
        `${routePath}/:id`,
        ...getMiddlewares("destroy"),
        controller.destroy,
      );
    }

    return router;
  };

  return router;
}
