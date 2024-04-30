import { APP, registerMiddleware } from "./src/app";
import { useServer } from "./src/server";
import { createSchedule, ScheduledTask } from "./src/modules/tasks";
import { redisClient } from "./src/modules/redis";

import {
  NextInterface,
  RequestInterface,
  ResponseInterface,
} from "./src/interfaces/router";

export {
  RequestInterface as Request,
  ResponseInterface as Response,
  NextInterface as Next,
};

export {
  APP,
  useServer,
  registerMiddleware,
  createSchedule,
  ScheduledTask,
  redisClient,
};
