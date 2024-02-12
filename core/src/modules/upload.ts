import multer from "multer";
import path from "path";
import { RequestInterface } from "../interfaces/router";
import { join } from "path";
import { isProd } from "../global";

const uploadPath = join(process.cwd(), isProd, "app/config/upload");
const { uploadConfig } = require(uploadPath);

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, path.resolve(process.cwd(), "uploads"));
  },

  filename: (request, file, callback) => {
    const time = new Date().getTime();

    callback(null, `${time}_${file.originalname}`);
  },
});

const LocalStrategy = () => multer({ storage });
const S3Strategy = () => {
  const multerS3 = require("multer-s3");
  const { S3Client } = require("@aws-sdk/client-s3");
  const { credentials, bucket, region } = uploadConfig.aws;
  const s3 = new S3Client({ region, credentials });

  return multer({
    storage: multerS3({
      s3,
      bucket,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (
        request: RequestInterface,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
      ) {
        const time = new Date().getTime();

        callback(null, `${time}_${file.originalname}`);
      },
    }),
  });
};

const uploadStrategy = () => {
  switch (uploadConfig.drive) {
    case "local":
      return LocalStrategy();

    case "s3":
      return S3Strategy();

    default:
      return LocalStrategy();
  }
};

export const upload = uploadStrategy();
