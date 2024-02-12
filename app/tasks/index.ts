import { ScheduledTask } from "core";
import { ShowTime } from "./FirstTask";

class TaskManager {
  private jobs: ScheduledTask[];

  constructor() {
    this.jobs = [ShowTime];
  }

  public run() {
    this.jobs.forEach((job) => job.start());
  }
}

export default new TaskManager();
