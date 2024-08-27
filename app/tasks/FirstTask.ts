import { createSchedule } from "core";

function Task() {
	// const datetime = new Date();
	// const time = datetime.toLocaleTimeString([], {
	//   hour: "2-digit",
	//   minute: "2-digit",
	//   second: "2-digit",
	// });
	// console.log(`It's ${time}.`);
}

export const ShowTime = createSchedule("* * * * *", Task, {
	scheduled: false,
});
