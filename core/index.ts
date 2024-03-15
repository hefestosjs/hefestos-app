import { APP, registerMiddleware } from "./src/app";
import { useServer } from "./src/server";
import AppError from "./src/errors/AppError";
import ApiResponse from "./src/utils/ApiResponse";
import { createSchedule, ScheduledTask } from "./src/modules/tasks";
import { useCache } from "./src/modules/cache";
import { renderHtml } from "./src/modules/views";
import {
  NextInterface,
  RequestInterface,
  ResponseInterface,
} from "./src/interfaces/router";
import ResponseUtils from "./src/utils/ResponseUtils";
import { redisClient } from "./src/modules/redis";

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
  redisClient,
  renderHtml,
};
