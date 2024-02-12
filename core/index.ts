import { APP } from "./src/app";
import { registerMiddleware, useServer } from "./src/server";
import AppError from "./src/errors/AppError";
import ApiResponse from "./src/utils/ApiResponse";
import { createSchedule, ScheduledTask } from "./src/modules/tasks";
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
  AppError,
  ApiResponse,
  createSchedule,
  ScheduledTask,
};
