import chai, { expect } from "chai";
import sinon from "sinon";
import faker from "faker";
import { VerificationEmail } from "./VerificationEmail";
import { EmailService } from "../../../../../services/EmailService/EmailService";

chai.use(require("chai-as-promised"));

describe("VerificationEmail class", () => {
  describe("send method", () => {
    let sendMailStub: sinon.SinonStub;

    beforeEach(() => {
      sendMailStub = sinon.stub(EmailService, "sendEmail");
    });

    afterEach(() => {
      sendMailStub.restore();
    });

    it("should throw an error when no email passed in the instance", async () => {
      const verificationEmail = new VerificationEmail({
        code: faker.datatype.number(4),
      });

      await expect(verificationEmail.send()).to.be.rejectedWith(
        "should provide the email"
      );
    });

    it("should call the sendEmail method from the EmailService class when the email and code exists in the instance", async () => {
      const mockProps = {
        code: faker.datatype.number(4),
        email: `${(Math.random() * 10e4).toFixed()}@gmail.com`,
      };
      const verificationEmail = new VerificationEmail(mockProps);

      await expect(verificationEmail.send()).to.eventually.fulfilled;

      expect(sendMailStub.calledOnce).to.be.true;
      expect(sendMailStub.args[0][0]).to.have.property("to", mockProps.email);
      expect(sendMailStub.args[0][0])
        .to.have.property("template")
        .to.includes(mockProps.code);
    });
  });
});
