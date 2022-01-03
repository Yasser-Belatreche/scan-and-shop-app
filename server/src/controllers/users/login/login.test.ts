import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { server } from "../../..";

chai.use(chaiHttp);

const myMockEmail = `${Math.round(Math.random() * 100)}@gmail.com`;

describe("POST /api/users/login", () => {
  it("should log the user in and return a token", (done) => {
    chai
      .request(server)
      .post("/api/users/login")
      .send({
        email: "yasser@gmail.com",
        password: "yasser2002",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("success").to.be.true;
        expect(res.body).to.have.property("data").to.includes("Bearer");
        done();
      });
  });

  describe("should return an errors object when passing unvalid values", () => {
    it("password error when passing a password < 8", (done) => {
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: "yasser@gmail.com",
          password: "my ",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success").to.be.false;
          expect(res.body)
            .to.have.property("errors")
            .to.have.property("password")
            .to.includes("at least 8");
          done();
        });
    });

    it("email error when passing unvalid email", (done) => {
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: "sdff",
          password: "mysdfsdfs",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success").to.be.false;
          expect(res.body)
            .to.have.property("errors")
            .to.have.property("email")
            .to.include("be a valid email");
          done();
        });
    });
  });

  describe("should return a credentials error when there is no match for the values", () => {
    it("when the user does not exist", (done) => {
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: myMockEmail,
          password: "mysdfsdfsdf",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success").to.be.false;
          expect(res.body)
            .to.have.property("errors")
            .to.have.property("credentials")
            .to.include("try again");
          done();
        });
    });

    it("when the password is wrong", (done) => {
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: "yasser@gmail.com",
          password: "yasser0000",
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("success").to.be.false;
          expect(res.body)
            .to.have.property("errors")
            .to.have.property("credentials")
            .to.include("try again");
          done();
        });
    });
  });

  after(() => {
    server.close();
  });
});
