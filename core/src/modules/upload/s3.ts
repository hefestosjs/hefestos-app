import fs from "fs";
import { join } from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ParamsType } from ".";
import { isProd } from "../../global";
import { File } from "../file";

export async function uploadToS3(params: ParamsType): Promise<void> {
  const uploadConfigPath = join(process.cwd(), isProd, "app/config/upload");
  const { uploadConfig } = require(uploadConfigPath);

  const { credentials, bucket, region } = uploadConfig.aws;
  const s3Client = new S3Client({ region, credentials });

  const filePath = join(
    process.cwd(),
    "uploads",
    params.folder || "",
    params.fileName
  );

  const key = join(params.folder || "", params.fileName);
  const body = await File.createBuffer(filePath);

  const config = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: params.file.mimetype,
  };

  try {
    const command = new PutObjectCommand(config);
    await s3Client.send(command);

    fs.unlinkSync(filePath);
  } catch (error) {
    throw error;
  }
}
