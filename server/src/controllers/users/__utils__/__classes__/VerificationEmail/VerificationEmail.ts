import { EmailService } from "../../../../../services/EmailService/EmailService";

interface IVerificationEmail {
  email?: string;
  code: number;
}

class VerificationEmail {
  private _email?: string;
  private _code: number;

  constructor(params: IVerificationEmail) {
    this._email = params.email?.trim();
    this._code = params.code;
  }

  public async send() {
    try {
      if (!this._email || !this._code) {
        throw "should provide the email and code to the instance";
      }

      await EmailService.sendEmail({
        subject: "Your verification code",
        to: this._email,
        template: this.verificationEmailTemplate(),
      });
    } catch (error) {
      throw new Error(
        `Something went wrong at VerifictionEmail.send(), ${error}`
      );
    }
  }

  private verificationEmailTemplate() {
    return `<p>your code is : ${this._code}</p>`;
  }
}

export { VerificationEmail };
