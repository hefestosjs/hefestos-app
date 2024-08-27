import { uploadToS3 } from "./s3";

export type ParamsType = {
	folder?: string;
	fileName: string;
	file: Express.Multer.File;
};

export const uploadTo = {
	s3: (params: ParamsType) => uploadToS3(params),
};
