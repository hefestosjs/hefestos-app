import type { ScheduledTask } from "core";
import { ShowTime } from "./FirstTask";

class TaskManager {
	private jobs: ScheduledTask[];

	constructor() {
		this.jobs = [ShowTime];
	}

	public run() {
		for (const job of this.jobs) {
			job.start();
		}
	}
}

export default new TaskManager();
