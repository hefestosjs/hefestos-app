import { join } from "path";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
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

  try {
    const command = new DeleteObjectCommand(config);
    await s3Client.send(command);
  } catch (error) {
    throw error;
  }
}

export default DeleteObject;
