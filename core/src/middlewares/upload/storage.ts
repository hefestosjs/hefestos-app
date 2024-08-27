import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import type { ParamsType } from ".";

export const storage = (params?: ParamsType) => {
	return multer.diskStorage({
		destination: (request, file, callback) => {
			let folder = "uploads";

			if (params?.folder) {
				if (!fs.existsSync(`uploads/${params.folder}`)) {
					fs.mkdirSync(`uploads/${params.folder}`);
				}

				folder = `uploads/${params.folder}`;
			}

			callback(null, path.resolve(process.cwd(), folder));
		},

		filename: async (request, file, callback) => {
			const fileName = `${file.fieldname}_${uuidv4()}_${file.originalname}`;

			callback(null, fileName);
		},
	});
};
