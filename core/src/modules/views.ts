import { Express } from "express";
import { join } from "path";
import nunjucks from "nunjucks";
import { isProd } from "../global";

export default function Views(APP: Express, ROOT_PATH: string) {
  const viewsPath = join(ROOT_PATH, isProd, "app", "resources", "views");
  const layoutsPath = join(ROOT_PATH, isProd, "app", "resources", "layouts");
  const partialsPath = join(ROOT_PATH, isProd, "app", "resources", "partials");
  const mailsPath = join(ROOT_PATH, isProd, "app", "resources", "mails");

  APP.engine("nj", nunjucks.render);
  APP.set("view engine", "nj");

  nunjucks.configure([viewsPath, layoutsPath, partialsPath, mailsPath], {
    autoescape: true,
    watch: true,
    express: APP,
  });
}
