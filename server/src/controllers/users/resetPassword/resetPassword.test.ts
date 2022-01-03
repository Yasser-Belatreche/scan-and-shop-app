import chai, { expect } from "chai";
import Sinon, { reset } from "sinon";
import { server } from "../../..";
import { JWT } from "../../../utils/__classes__/JWT/JWT";
import { User } from "../../../utils/__classes__/User/User";
import { BcryptPassword } from "../__utils__/__classes__/BcryptPassword/BcryptPassword";
import { Validator } from "../__utils__/__classes__/Validator/Validator";

chai.use(require("chai-http"));

describe("PUT /users/resetPassword", () => {
  let validateResetPasswordBodySpy: Sinon.SinonSpy;
  let generateHashSpy: Sinon.SinonSpy;
  let resetPasswordSpy: Sinon.SinonSpy;

  beforeEach(() => {
    validateResetPasswordBodySpy = Sinon.spy(
      Validator,
      "validateResetPasswordBody"
    );
    generateHashSpy = Sinon.spy(BcryptPassword.prototype, "generateHash");
    resetPasswordSpy = Sinon.spy(User.prototype, "resetPassword");
  });

  afterEach(() => {
    validateResetPasswordBodySpy.restore();
    generateHashSpy.restore();
    resetPasswordSpy.restore();
  });

  after(() => {
    server.close();
  });

  it("should go throught the auth middleware", (done) => {
    chai
      .request(server)
      .put("/api/users/resetPassword")
      .send({ password: "slksdjf", confirmPassword: "sdfs" })
      .end((err, res) => {
        if (err) console.log(err);

        expect(validateResetPasswordBodySpy.calledOnce).to.be.false;
        expect(generateHashSpy.calledOnce).to.be.false;
        expect(resetPasswordSpy.calledOnce).to.be.false;

        expect(res).to.have.status(401);
        expect(res.body)
          .to.have.property("errors")
          .to.includes("No token in the headers");
        done();
      });
  });

  it("should return a password error when the password is less than 8 characters", (done) => {
    chai
      .request(server)
      .put("/api/users/resetPassword")
      .send({ password: "slksdjf", confirmPassword: "sdfs" })
      .set("authorization", `Bearer ${JWT.sign({ userId: 14 })}`)
      .end((err, res) => {
        if (err) console.log(err);

        expect(validateResetPasswordBodySpy.calledOnce).to.be.true;
        expect(generateHashSpy.calledOnce).to.be.false;
        expect(resetPasswordSpy.calledOnce).to.be.false;

        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property("errors")
          .to.have.property("password")
          .to.includes("at least 8 characters");

        done();
      });
  });

  it("should return an error when the password does not match the confirmPassword", (done) => {
    chai
      .request(server)
      .put("/api/users/resetPassword")
      .send({ password: "sdfsdfsdf", confirmPassword: "ssdfsdfsdssdfs" })
      .set("authorization", `Bearer ${JWT.sign({ userId: 14 })}`)
      .end((err, res) => {
        if (err) console.log(err);

        expect(validateResetPasswordBodySpy.calledOnce).to.be.true;
        expect(generateHashSpy.calledOnce).to.be.false;
        expect(resetPasswordSpy.calledOnce).to.be.false;

        expect(res).to.have.status(400);
        expect(res.body)
          .to.have.property("errors")
          .to.have.property("confirmPassword")
          .to.includes("password did not match");

        done();
      });
  });

  it("should return a success msg when the password successfully changed", (done) => {
    chai
      .request(server)
      .put("/api/users/resetPassword")
      .send({ password: "yasser2002", confirmPassword: "yasser2002" })
      .set("authorization", `Bearer ${JWT.sign({ userId: 14 })}`)
      .end((err, res) => {
        if (err) console.log(err);

        expect(validateResetPasswordBodySpy.calledOnce).to.be.true;
        expect(generateHashSpy.calledOnce).to.be.true;
        expect(resetPasswordSpy.calledOnce).to.be.true;

        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property("data")
          .to.includes(`successfully changed`);

        done();
      });
  });
});
