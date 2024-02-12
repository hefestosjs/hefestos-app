import { APP, APP_PORT } from "./app";
import TaskManager from "./modules/tasks";

export const registerMiddleware = APP.use;

export const useServer = (port: number = APP_PORT) => {
  APP.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);

    TaskManager(process.cwd());
  });
};
