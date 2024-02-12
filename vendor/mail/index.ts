import nodemailer from "nodemailer";
import { SendMailInterface } from "./interfaces";
import { mailerConfig } from "app/config/mailer";

export default class Mailer {
  private static mailer = nodemailer.createTransport(mailerConfig);

  static async sendMail(options: SendMailInterface) {
    const info = await this.mailer.sendMail(options);

    return info;
  }
}
