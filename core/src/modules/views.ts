import { Express } from "express";
import { join } from "path";
import nunjucks from "nunjucks";
import { isProd } from "../global";

export default function Views(APP: Express) {
  const viewsPath = join(process.cwd(), isProd, "app/resources/views");
  const layoutsPath = join(process.cwd(), isProd, "app/resources/layouts");
  const partialsPath = join(process.cwd(), isProd, "app/resources/partials");
  const mailsPath = join(process.cwd(), isProd, "app/resources/mails");

  APP.engine("nj", nunjucks.render);
  APP.set("view engine", "nj");

  nunjucks.configure([viewsPath, layoutsPath, partialsPath, mailsPath], {
    autoescape: true,
    watch: true,
    express: APP,
  });
}
