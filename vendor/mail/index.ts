import { mailerConfig } from "app/config/mailer";
import nodemailer from "nodemailer";
import type { SendMailInterface } from "./interfaces";

export default class Mailer {
	private static mailer = nodemailer.createTransport(mailerConfig);

	static async sendMail(options: SendMailInterface) {
		const info = await Mailer.mailer.sendMail(options);

		return info;
	}
}
