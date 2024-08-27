import multer from "multer";
import type { ParamsType } from ".";
import { storage } from "./storage";

export const LocalStrategy = (params?: ParamsType) => {
	return multer({ storage: storage(params) });
};
