import { join } from "path";
import { isProd } from "../../global";
import { LocalStrategy } from "./strategies";

export type ParamsType = {
  folder?: string;
};

const uploadPath = join(process.cwd(), isProd, "app/config/upload");
export const { uploadConfig } = require(uploadPath);

export const upload = (params?: ParamsType) => LocalStrategy(params);
