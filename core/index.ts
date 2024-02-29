import { APP, registerMiddleware } from "./src/app";
import { useServer } from "./src/server";
import AppError from "./src/errors/AppError";
import ApiResponse from "./src/utils/ApiResponse";
import { createSchedule, ScheduledTask } from "./src/modules/tasks";
import { useCache } from "./src/modules/cache";
import {
  NextInterface,
  RequestInterface,
  ResponseInterface,
} from "./src/interfaces/router";
import ResponseUtils from "./src/utils/ResponseUtils";

export {
  RequestInterface as Request,
  ResponseInterface as Response,
  NextInterface as Next,
};

export {
  APP,
  useServer,
  registerMiddleware,
  AppError,
  ApiResponse,
  ResponseUtils,
  createSchedule,
  ScheduledTask,
  useCache,
};
