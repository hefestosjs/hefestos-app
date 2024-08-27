import { APP, registerMiddleware } from "./src/app";
import { redisClient } from "./src/modules/redis";
import { createSchedule } from "./src/modules/tasks";
import type { ScheduledTask } from "./src/modules/tasks";
import { useServer } from "./src/server";

import type {
	NextInterface,
	RequestInterface,
	ResponseInterface,
} from "./src/interfaces/router";

export type {
	RequestInterface as Request,
	ResponseInterface as Response,
	NextInterface as Next,
	ScheduledTask,
};

export { APP, useServer, registerMiddleware, createSchedule, redisClient };
