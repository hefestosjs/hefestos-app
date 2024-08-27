import { join } from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { isProd } from "../../global";

interface ParamsType {
	key: string;
	body: Buffer;
	contentType: string;
}

async function PutObject(params: ParamsType): Promise<void> {
	const uploadConfigPath = join(process.cwd(), isProd, "app/config/upload");
	const { uploadConfig } = require(uploadConfigPath);

	const { credentials, bucket, region } = uploadConfig.aws;
	const s3Client = new S3Client({ region, credentials });

	const config = {
		Bucket: bucket,
		Key: params.key,
		Body: params.body,
		ContentType: params.contentType,
	};

	const command = new PutObjectCommand(config);
	await s3Client.send(command);
}

export default PutObject;
