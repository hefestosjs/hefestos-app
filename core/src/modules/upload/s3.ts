import { join } from "node:path";
import type { ParamsType } from ".";
import { File } from "../file";
import { S3 } from "../s3";
import { cleanTmp } from "./cleanTmp";

export async function uploadToS3(params: ParamsType): Promise<void> {
	const folderPath = join(process.cwd(), "uploads", params.folder || "");
	const filePath = join(folderPath, params.fileName);

	const key = join(params.folder || "", params.fileName);
	const body = await File.createBuffer(filePath);

	const config = {
		key,
		body,
		contentType: params.file.mimetype,
	};

	try {
		await S3.put(config);

		await cleanTmp(filePath, folderPath);
	} catch (error) {
		await cleanTmp(filePath, folderPath);

		throw error;
	}
}
