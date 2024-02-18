import express, { Express } from "express";
import { join } from "path";
import { isProd } from "../global";

export default function Assets(APP: Express) {
  const ROOT_PATH = process.cwd();

  APP.use(express.static(join(ROOT_PATH, "public")));
  APP.use("/css", express.static(join(ROOT_PATH, isProd, "public/css")));
  APP.use("/js", express.static(join(ROOT_PATH, isProd, "app/resources/js")));
  APP.use("/images", express.static(join(ROOT_PATH, isProd, "public/images")));
  APP.use("/assets", express.static(join(ROOT_PATH, isProd, "public/assets")));

  if (process.env.DRIVE === "local") {
    APP.use("/files", express.static(join(ROOT_PATH, "uploads")));
  }
}
