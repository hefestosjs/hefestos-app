import { Router as ExpressRouter } from "express";
import { join } from "path";
import { Controller, RouterInterface } from "./interfaces/router";
import { formatRoutePath } from "./utils/formatRoutePath";
import { isProd } from "./global";

export function Router(): RouterInterface {
  const router = ExpressRouter() as RouterInterface;

  router.resources = function (path, controllerName) {
    const routePath = formatRoutePath(path);
    const controllerPath = join(process.cwd(), isProd, "app/controllers");
    const controllerFile = `${controllerPath}/${controllerName}`;
    const controller: Controller = require(controllerFile).default;

    if (controller.index) {
      router.get(routePath, controller.index);
    }

    if (controller.show) {
      router.get(`${routePath}/details/:id`, controller.show);
    }

    if (controller.create) {
      router.get(`${routePath}/create`, controller.create);
    }

    if (controller.store) {
      router.post(routePath, controller.store);
    }

    if (controller.edit) {
      router.get(`${routePath}/edit/:id`, controller.edit);
    }

    if (controller.update) {
      router.put(`${routePath}/:id`, controller.update);
    }

    if (controller.destroy) {
      router.delete(`${routePath}/:id`, controller.destroy);
    }

    return router;
  };

  return router;
}
