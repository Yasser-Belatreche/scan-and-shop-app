import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import Sinon from "sinon";
import faker from "faker";
import { server } from "../../..";
import { VerificationEmail } from "../__utils__/__classes__/VerificationEmail/VerificationEmail";
import { VerificationCode } from "../__utils__/__classes__/VerificationCode/VerificationCode";
import { User } from "../../../utils/__classes__/User/User";
import { BcryptPassword } from "../__utils__/__classes__/BcryptPassword/BcryptPassword";
import { JWT } from "../../../utils/__classes__/JWT/JWT";

chai.use(chaiHttp);

const myMockEmail = faker.internet.email();

describe("POST /api/users/signup", () => {
  let generateHashSpy: Sinon.SinonSpy;
  let addUserToDbSpy: Sinon.SinonSpy;
  let generateCodeSpy: Sinon.SinonSpy;
  let addCodeToDbSpy: Sinon.SinonSpy;
  let sendEmailStub: Sinon.SinonSpy;
  let jwtSignSpy: Sinon.SinonSpy;

  beforeEach(() => {
    generateHashSpy = Sinon.spy(BcryptPassword.prototype, "generateHash");
    addUserToDbSpy = Sinon.spy(User.prototype, "addToDb");
    generateCodeSpy = Sinon.spy(VerificationCode.prototype, "generateCode");
    addCodeToDbSpy = Sinon.spy(VerificationCode.prototype, "addToDb");
    sendEmailStub = Sinon.stub(VerificationEmail.prototype, "send");
    jwtSignSpy = Sinon.spy(JWT, "sign");
  });

  afterEach(() => {
    generateHashSpy.restore();
    addUserToDbSpy.restore();
    generateCodeSpy.restore();
    addCodeToDbSpy.restore();
    sendEmailStub.restore();
    jwtSignSpy.restore();
  });

  after(() => {
    server.close();
  });

  it("should add a user to DB successfully and return a token", (done) => {
    chai
      .request(server)
      .post("/api/users/signup")
      .send({
        name: faker.name.findName(),
        email: myMockEmail,
        password: "my supper secret password",
      })
      .end((err, res) => {
        expect(generateHashSpy.calledOnce).to.be.true;
        expect(addUserToDbSpy.calledOnce).to.be.true;
        expect(generateCodeSpy.calledOnce).to.be.true;
        expect(addCodeToDbSpy.calledOnce).to.be.true;
        expect(sendEmailStub.calledOnce).to.be.true;
        expect(jwtSignSpy.calledOnce).to.be.true;

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("success").to.be.true;
        expect(res.body).to.have.property("data").to.includes("Bearer");
        done();
      });
  });

  describe("should return an errors object when passing unvalid values", () => {
    it("should return a password error when passing a password < 8", (done) => {
      chai
        .request(server)
        .post("/api/users/signup")
        .send({
          name: "Yasser",
          email: myMockEmail,
          password: "my ",
        })
        .end((err, res) => {
          expect(generateHashSpy.calledOnce).to.be.false;
          expect(addUserToDbSpy.calledOnce).to.be.false;
          expect(generateCodeSpy.calledOnce).to.be.false;
          expect(addCodeToDbSpy.calledOnce).to.be.false;
          expect(sendEmailStub.calledOnce).to.be.false;
          expect(jwtSignSpy.calledOnce).to.be.false;

          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success").to.be.false;
          expect(res.body)
            .to.have.property("errors")
            .to.have.property("password")
            .to.includes("at least 8");

          done();
        });
    });

    it("should return a name or email error when passing empty values", (done) => {
      chai
        .request(server)
        .post("/api/users/signup")
        .send({
          name: "",
          email: "",
          password: "my ",
        })
        .end((err, res) => {
          expect(generateHashSpy.calledOnce).to.be.false;
          expect(addUserToDbSpy.calledOnce).to.be.false;
          expect(generateCodeSpy.calledOnce).to.be.false;
          expect(addCodeToDbSpy.calledOnce).to.be.false;
          expect(sendEmailStub.calledOnce).to.be.false;
          expect(jwtSignSpy.calledOnce).to.be.false;

          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success").to.be.false;
          expect(res.body)
            .to.have.property("errors")
            .to.have.property("name")
            .to.includes("not be empty");
          expect(res.body)
            .to.have.property("errors")
            .to.have.property("email")
            .to.include("be a valid email");

          done();
        });
    });

    it("should return an email error when passing email exists", (done) => {
      chai
        .request(server)
        .post("/api/users/signup")
        .send({
          name: "Yasser",
          email: myMockEmail,
          password: "mysecretpassword",
        })
        .end((err, res) => {
          expect(generateHashSpy.calledOnce).to.be.false;
          expect(addUserToDbSpy.calledOnce).to.be.false;
          expect(generateCodeSpy.calledOnce).to.be.false;
          expect(addCodeToDbSpy.calledOnce).to.be.false;
          expect(sendEmailStub.calledOnce).to.be.false;
          expect(jwtSignSpy.calledOnce).to.be.false;

          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success").to.be.false;
          expect(res.body)
            .to.have.property("errors")
            .to.have.property("email")
            .to.includes("already in use");
          done();
        });
    });
  });
});
