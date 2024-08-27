import { join } from "node:path";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { isProd } from "../../global";

interface ParamsType {
	fileName: string;
	folder?: string;
}

async function DeleteObject(params: ParamsType): Promise<void> {
	const uploadConfigPath = join(process.cwd(), isProd, "app/config/upload");
	const { uploadConfig } = require(uploadConfigPath);

	const { credentials, bucket, region } = uploadConfig.aws;
	const s3Client = new S3Client({ region, credentials });

	const key = join(params.folder || "", params.fileName);

	const config = {
		Bucket: bucket,
		Key: key,
	};

	const command = new DeleteObjectCommand(config);
	await s3Client.send(command);
}

export default DeleteObject;
