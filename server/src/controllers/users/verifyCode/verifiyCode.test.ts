import chai, { expect } from "chai";
import Sinon from "sinon";
import { server } from "../../..";
import { JWT } from "../../../utils/__classes__/JWT/JWT";
import { User } from "../../../utils/__classes__/User/User";
import { Validator } from "../__utils__/__classes__/Validator/Validator";
import { VerificationCode } from "../__utils__/__classes__/VerificationCode/VerificationCode";

chai.use(require("chai-http"));

describe("POST /api/users/verifyCode", async () => {
  let code: number;

  let isValidEmailSpy: Sinon.SinonSpy;
  let getCodeFromDbSpy: Sinon.SinonSpy;
  let isUserExistSpy: Sinon.SinonSpy;
  let setUserVerifiedSpy: Sinon.SinonSpy;
  let deleteCodeFromDbSpy: Sinon.SinonSpy;
  let jwtSignSpy: Sinon.SinonSpy;

  before(async () => {
    // to make sure the code exist
    const verificationCode = new VerificationCode({ userId: 14 });
    code = verificationCode.generateCode();
    await verificationCode.deleteFromDb();
    await verificationCode.addToDb();
  });

  beforeEach(() => {
    isValidEmailSpy = Sinon.spy(Validator, "isValidEmail");
    isUserExistSpy = Sinon.spy(User.prototype, "isExist");
    getCodeFromDbSpy = Sinon.spy(VerificationCode.prototype, "getFromDb");
    setUserVerifiedSpy = Sinon.spy(User.prototype, "setVerified");
    deleteCodeFromDbSpy = Sinon.spy(VerificationCode.prototype, "deleteFromDb");
    jwtSignSpy = Sinon.spy(JWT, "sign");
  });

  afterEach(() => {
    isValidEmailSpy.restore();
    isUserExistSpy.restore();
    getCodeFromDbSpy.restore();
    setUserVerifiedSpy.restore();
    deleteCodeFromDbSpy.restore();
    jwtSignSpy.restore();
  });

  after(() => {
    server.close();
  });

  it("should return an error when no email in the request body", (done) => {
    chai
      .request(server)
      .post("/api/users/verifyCode")
      .send({ code: 3232, email: "slkdfj" })
      .end((err, res) => {
        if (err) console.log(err);

        expect(isValidEmailSpy.calledOnce).to.be.true;
        expect(isUserExistSpy.calledOnce).to.be.false;
        expect(getCodeFromDbSpy.calledOnce).to.be.false;
        expect(deleteCodeFromDbSpy.calledOnce).to.be.false;
        expect(setUserVerifiedSpy.calledOnce).to.be.false;
        expect(jwtSignSpy.calledOnce).to.be.false;

        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property("errors")
          .to.includes("must be a valid email");

        done();
      });
  });

  it("should return an error when the email not exist in DB", (done) => {
    chai
      .request(server)
      .post("/api/users/verifyCode")
      .send({ code: 3232, email: "slkdfjlksdjflkqsjdf@gmail.com" })
      .end((err, res) => {
        if (err) console.log(err);

        expect(isValidEmailSpy.calledOnce).to.be.true;
        expect(isUserExistSpy.calledOnce).to.be.true;
        expect(getCodeFromDbSpy.calledOnce).to.be.false;
        expect(deleteCodeFromDbSpy.calledOnce).to.be.false;
        expect(setUserVerifiedSpy.calledOnce).to.be.false;
        expect(jwtSignSpy.calledOnce).to.be.false;

        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property("errors")
          .to.includes("no user with the associated email");

        done();
      });
  });

  it("when the email exist, should return an error if the code sent does not match the code in DB", (done) => {
    chai
      .request(server)
      .post("/api/users/verifyCode")
      .send({ code: 3232, email: "yasser@gmail.com" })
      .end((err, res) => {
        if (err) console.log(err);

        expect(isValidEmailSpy.calledOnce).to.be.true;
        expect(isUserExistSpy.calledOnce).to.be.true;
        expect(getCodeFromDbSpy.calledOnce).to.be.true;
        expect(deleteCodeFromDbSpy.calledOnce).to.be.false;
        expect(setUserVerifiedSpy.calledOnce).to.be.false;
        expect(jwtSignSpy.calledOnce).to.be.false;

        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property("errors")
          .to.includes("wrong verification code");

        done();
      });
  });

  it("when the email exist and the code sent is correct should delete the code from db, and modify the verified user property and return the token", (done) => {
    chai
      .request(server)
      .post("/api/users/verifyCode")
      .send({ code, email: "yasser@gmail.com" })
      .end((err, res) => {
        if (err) console.log(err);

        expect(isValidEmailSpy.calledOnce).to.be.true;
        expect(isUserExistSpy.calledOnce).to.be.true;
        expect(getCodeFromDbSpy.calledOnce).to.be.true;
        expect(deleteCodeFromDbSpy.calledOnce).to.be.true;
        expect(setUserVerifiedSpy.calledOnce).to.be.true;
        expect(jwtSignSpy.calledOnce).to.be.true;

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("data").to.includes("Bearer ");

        done();
      });
  });
});
