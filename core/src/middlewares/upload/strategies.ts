import multer from "multer";
import { storage } from "./storage";
import { ParamsType } from ".";

export const LocalStrategy = (params?: ParamsType) => {
  return multer({ storage: storage(params) });
};
