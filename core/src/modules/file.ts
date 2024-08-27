import fs, { type ReadStream } from "node:fs";

export const File = {
	exists: (filePath: string) => {
		return fs.existsSync(filePath);
	},

	rename: (oldPath: string, newPath: string) => {
		return fs.renameSync(oldPath, newPath);
	},

	move: (from: string, to: string) => {
		return fs.renameSync(from, to);
	},

	remove: (filePath: string) => {
		return fs.rmSync(filePath);
	},

	loadStream: async (stream: ReadStream): Promise<Buffer> =>
		new Promise((resolve, reject) => {
			const chunks: any[] = [];

			stream.on("data", (chunk) => chunks.push(chunk));
			stream.on("error", reject);
			stream.on("end", () => resolve(Buffer.concat(chunks)));
		}),

	createBuffer: async (filePath: string): Promise<Buffer> => {
		const stream = fs.createReadStream(filePath);

		return await File.loadStream(stream);
	},
};
