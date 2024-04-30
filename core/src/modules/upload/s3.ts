import fs from "fs";
import { join } from "path";
import { ParamsType } from ".";
import { File } from "../file";
import { S3 } from "../s3";

export async function uploadToS3(params: ParamsType): Promise<void> {
  const filePath = join(
    process.cwd(),
    "uploads",
    params.folder || "",
    params.fileName
  );

  const key = join(params.folder || "", params.fileName);
  const body = await File.createBuffer(filePath);

  const config = {
    key,
    body,
    contentType: params.file.mimetype,
  };

  try {
    await S3.put(config);

    fs.unlinkSync(filePath);
  } catch (error) {
    throw error;
  }
}
