import cluster from "node:cluster";
import type { Server } from "node:http";
import os from "node:os";
import { join } from "node:path";
import { APP, APP_PORT } from "./app";
import { isProd } from "./global";
import TaskManager from "./modules/tasks";

const gracefullShutdown = (server: Server) => {
	const shutdown = (event: string, code: number) => {
		server.close(() => {
			console.log("\nServer is gracefully shutting down...");
			console.log(`${event} received with code: ${code}`);

			if (code !== 0 && code !== 2) {
				console.log("Restarting server...");
				useServer();
			} else {
				process.exit(code);
			}
		});
	};

	process.on("uncaughtException", (error, origin) => {
		console.log(`\n${origin} signal received. \n${error}`);
	});

	process.on("unhandledRejection", (error) => {
		console.log(`\nunhandledRejection signal received. \n${error}`);
	});

	process.on("SIGINT", shutdown);
	process.on("SIGTERM", shutdown);
	process.on("exit", (code) => {
		console.log(`exit signal received with code: ${code}`);
	});
};

const runPrimaryProcess = () => {
	const processesCount = os.cpus().length;
	console.log(`Primary process ${process.pid} is running`);
	console.log(`Forking Server with ${processesCount} processes \n`);

	for (let i = 0; i < processesCount; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		if (code !== 0 && !worker.exitedAfterDisconnect) {
			const processClosed = worker.process.pid;

			console.log(`Worker ${processClosed} died... scheduling another one!`);
			cluster.fork();
		}
	});
};

const runWorkerProcess = (port: number) => {
	const processId = process.pid;

	const server = APP.listen(port, () => {
		const address = `http://localhost:${port}`;
		console.log(`Server running in ${address} and process ${processId}`);
	});

	gracefullShutdown(server);
};

export const useServer = (port: number = APP_PORT) => {
	const performancePath = join(process.cwd(), isProd, "app/config/performance");
	const performance = require(performancePath).PerformanceConfig;

	if (performance.cluster) {
		cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess(port);
	}

	if (!performance.cluster) {
		const server = APP.listen(port, () => {
			const address = `http://localhost:${port} and process ${process.pid}`;
			console.log(`Server is running in ${address}`);
		});

		gracefullShutdown(server);
	}

	TaskManager(process.cwd());
};
