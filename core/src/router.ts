import { join } from "node:path";
import { Router as ExpressRouter } from "express";
import { isProd } from "./global";
import type { Controller, RouterInterface } from "./interfaces/router";
import { formatRoutePath } from "./utils/formatRoutePath";

export function Router(): RouterInterface {
	const router = ExpressRouter() as RouterInterface;

	router.resources = (path, controllerName, middlewares = []) => {
		const routePath = formatRoutePath(path);
		const controllerPath = join(process.cwd(), isProd, "app/controllers");
		const controllerFile = `${controllerPath}/${controllerName}`;
		const controller: Controller = require(controllerFile).default;

		if (controller.index) {
			router.get(routePath, ...middlewares, controller.index);
		}

		if (controller.show) {
			router.get(`${routePath}/details/:id`, ...middlewares, controller.show);
		}

		if (controller.create) {
			router.get(`${routePath}/create`, ...middlewares, controller.create);
		}

		if (controller.store) {
			router.post(routePath, ...middlewares, controller.store);
		}

		if (controller.edit) {
			router.get(`${routePath}/edit/:id`, ...middlewares, controller.edit);
		}

		if (controller.update) {
			router.put(`${routePath}/:id`, ...middlewares, controller.update);
		}

		if (controller.destroy) {
			router.delete(`${routePath}/:id`, ...middlewares, controller.destroy);
		}

		return router;
	};

	return router;
}
