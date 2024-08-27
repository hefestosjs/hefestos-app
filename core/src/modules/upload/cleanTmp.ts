import fs from "node:fs/promises";

export async function cleanTmp(filePath: string, folderPath: string) {
	try {
		await fs.unlink(filePath);

		const files = await fs.readdir(folderPath);

		if (files.length === 0) {
			await fs.rmdir(folderPath);
		}
	} catch (err) {
		console.log("Error when trying to clean up temporary files:", err);
	}
}
