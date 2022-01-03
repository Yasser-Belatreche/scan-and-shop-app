import faker from "faker";
import { expect } from "chai";
import nodemailer, { Transporter } from "nodemailer";
import { EmailService } from "./EmailService";
import Sinon from "sinon";

describe("EmailService Class", () => {
  describe("sendEmail method", () => {
    let sendMail: Sinon.SinonSpy;
    let createTransport: Sinon.SinonStub;

    beforeEach(() => {
      sendMail = Sinon.spy();
      createTransport = Sinon.stub(nodemailer, "createTransport").returns({
        sendMail,
      });
    });

    afterEach(() => {
      createTransport.restore();
    });

    it("should create a transporter and call the sendMail method with the correct args", () => {
      const mockEmail = {
        to: faker.internet.email(),
        subject: faker.random.word(),
        template: "<p>mock</p>",
      };

      EmailService.sendEmail(mockEmail);

      expect(createTransport.calledOnce).to.equal(true);
      expect(createTransport.args[0][0]).to.have.property("service", "gmail");
      expect(createTransport.args[0][0])
        .to.have.property("auth")
        .to.have.property("user")
        .to.be.a("string");
      expect(createTransport.args[0][0])
        .to.have.property("auth")
        .to.have.property("pass")
        .to.be.a("string");

      expect(sendMail.calledOnce).to.equal(true);
      expect(sendMail.args[0][0]).to.have.property("from").to.be.a("string");
      expect(sendMail.args[0][0])
        .to.have.property("to")
        .to.be.a("string")
        .equal(mockEmail.to);
      expect(sendMail.args[0][0])
        .to.have.property("subject")
        .to.be.a("string")
        .equal(mockEmail.subject);
      expect(sendMail.args[0][0])
        .to.have.property("html")
        .to.be.a("string")
        .equal(mockEmail.template);
    });
  });
});
