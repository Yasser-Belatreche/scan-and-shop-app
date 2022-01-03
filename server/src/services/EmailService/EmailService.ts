import * as nodemailer from "nodemailer";

interface EmailProps {
  to: string;
  subject: string;
  template: string;
}

class EmailService {
  private static readonly ADMIN_EMAIL: string = "yasser.belatreche0@gmail.com";
  constructor() {}

  public static async sendEmail(email: EmailProps) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: this.ADMIN_EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: this.ADMIN_EMAIL,
        to: email.to,
        subject: email.subject,
        html: email.template,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error(
        `Something went wrong at GmailService.sendEmail(): ${error}`
      );
    }
  }
}

export { EmailService };
