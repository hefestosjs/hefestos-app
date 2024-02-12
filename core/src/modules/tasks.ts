import { join } from "path";
import cron, { ScheduledTask } from "node-cron";
import { isProd } from "../global";

export const createSchedule = cron.schedule;
export { ScheduledTask };

export default function TaskManager(root_path: string) {
  const tasksPath = require(join(root_path, isProd, "app/tasks"));
  const runner = tasksPath.default.run();

  return runner;
}
