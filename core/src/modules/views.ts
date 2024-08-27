import { join } from "node:path";
import type { Express } from "express";
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

export const renderHtml = (name: string, context?: object | undefined) => {
	const ROOT_PATH = process.cwd();
	const path = join(ROOT_PATH, isProd, `app/resources/${name}`);

	return nunjucks.render(path, context);
};
