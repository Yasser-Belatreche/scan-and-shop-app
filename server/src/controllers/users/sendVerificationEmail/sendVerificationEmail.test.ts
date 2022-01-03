import chai, { expect } from "chai";
import Sinon from "sinon";
import { server } from "../../..";
import { User } from "../../../utils/__classes__/User/User";
import { Validator } from "../__utils__/__classes__/Validator/Validator";
import { VerificationCode } from "../__utils__/__classes__/VerificationCode/VerificationCode";
import { VerificationEmail } from "../__utils__/__classes__/VerificationEmail/VerificationEmail";

chai.use(require("chai-http"));

describe("post /api/users/sendVerificationEmail", async () => {
  let isValidEmailSpy: Sinon.SinonSpy;
  let isUserExistSpy: Sinon.SinonSpy;
  let generateUserInfoSpy: Sinon.SinonSpy;
  let generateCodeSpy: Sinon.SinonSpy;
  let isCodeExistSpy: Sinon.SinonSpy;
  let addCodeToDbSpy: Sinon.SinonSpy;
  let updateCodeInDbSpy: Sinon.SinonSpy;
  let sendEmailStub: Sinon.SinonStub;

  before(async () => {
    // make sure that the user does not have any code in DB
    const verificationCode = new VerificationCode({ userId: 14 });
    await verificationCode.deleteFromDb();
  });

  beforeEach(() => {
    isValidEmailSpy = Sinon.spy(Validator, "isValidEmail");
    isUserExistSpy = Sinon.spy(User.prototype, "isExist");
    generateUserInfoSpy = Sinon.spy(User.prototype, "generateInfo");
    generateCodeSpy = Sinon.spy(VerificationCode.prototype, "generateCode");
    isCodeExistSpy = Sinon.spy(VerificationCode.prototype, "isExistInDb");
    addCodeToDbSpy = Sinon.spy(VerificationCode.prototype, "addToDb");
    updateCodeInDbSpy = Sinon.spy(VerificationCode.prototype, "updateInDb");
    sendEmailStub = Sinon.stub(VerificationEmail.prototype, "send");
  });

  afterEach(() => {
    isValidEmailSpy.restore();
    isUserExistSpy.restore();
    generateUserInfoSpy.restore();
    generateCodeSpy.restore();
    isCodeExistSpy.restore();
    addCodeToDbSpy.restore();
    updateCodeInDbSpy.restore();
    sendEmailStub.restore();
  });

  after(() => {
    server.close();
  });

  it("should return an error when the email is not valid", (done) => {
    chai
      .request(server)
      .post("/api/users/sendVerificationEmail")
      .send({ email: "aysdf" })
      .end((err, res) => {
        if (err) console.log(err);

        expect(isValidEmailSpy.calledOnce).to.be.true;
        expect(isUserExistSpy.calledOnce).to.be.false;
        expect(generateUserInfoSpy.calledOnce).to.be.false;
        expect(generateCodeSpy.calledOnce).to.be.false;
        expect(isCodeExistSpy.calledOnce).to.be.false;
        expect(addCodeToDbSpy.calledOnce).to.be.false;
        expect(updateCodeInDbSpy.calledOnce).to.be.false;
        expect(sendEmailStub.calledOnce).to.be.false;

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("success").to.be.false;
        expect(res.body)
          .to.have.property("errors")
          .to.have.property("email")
          .to.includes("must be a valid email");
        done();
      });
  });

  it("should return an error when the email does not exist in the DB", (done) => {
    chai
      .request(server)
      .post("/api/users/sendVerificationEmail")
      .send({ email: "llsdkjflsqdfj@gmail.com" })
      .end((err, res) => {
        if (err) console.log(err);

        expect(isValidEmailSpy.calledOnce).to.be.true;
        expect(isUserExistSpy.calledOnce).to.be.true;
        expect(generateUserInfoSpy.calledOnce).to.be.true;
        expect(generateCodeSpy.calledOnce).to.be.false;
        expect(isCodeExistSpy.calledOnce).to.be.false;
        expect(addCodeToDbSpy.calledOnce).to.be.false;
        expect(updateCodeInDbSpy.calledOnce).to.be.false;
        expect(sendEmailStub.calledOnce).to.be.false;

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("success").to.be.false;
        expect(res.body)
          .to.have.property("errors")
          .to.have.property("email")
          .to.includes("no user associated with this email");
        done();
      });
  });

  it("if the email exist and the user have no code in DB, should add a new code and send it to his email and return the id of the user", (done) => {
    chai
      .request(server)
      .post("/api/users/sendVerificationEmail")
      .send({ email: "yasser@gmail.com" })
      .end((err, res) => {
        if (err) console.log(err);

        expect(isValidEmailSpy.calledOnce).to.be.true;
        expect(isUserExistSpy.calledOnce).to.be.true;
        expect(generateUserInfoSpy.calledTwice).to.be.true;
        expect(generateCodeSpy.calledOnce).to.be.true;
        expect(isCodeExistSpy.calledOnce).to.be.true;
        expect(addCodeToDbSpy.calledOnce).to.be.true;
        expect(updateCodeInDbSpy.calledOnce).to.be.false;
        expect(sendEmailStub.calledOnce).to.be.true;

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("success").to.be.true;
        expect(res.body)
          .to.have.property("data")
          .to.includes("verification code sent successfully");

        done();
      });
  });

  it("if the email exist and the user has a code in DB, should update the code and send it to his email and return the id of the user", (done) => {
    chai
      .request(server)
      .post("/api/users/sendVerificationEmail")
      .send({ email: "yasser@gmail.com" })
      .end((err, res) => {
        if (err) console.log(err);

        expect(isValidEmailSpy.calledOnce).to.be.true;
        expect(isUserExistSpy.calledOnce).to.be.true;
        expect(generateUserInfoSpy.calledTwice).to.be.true;
        expect(generateCodeSpy.calledOnce).to.be.true;
        expect(isCodeExistSpy.calledOnce).to.be.true;
        expect(addCodeToDbSpy.calledOnce).to.be.false;
        expect(updateCodeInDbSpy.calledOnce).to.be.true;
        expect(sendEmailStub.calledOnce).to.be.true;

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("success").to.be.true;
        expect(res.body)
          .to.have.property("data")
          .to.includes("verification code sent successfully");

        done();
      });
  });
});
