import axios from "axios";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import faker from "faker";
import sinon from "sinon";

import { server } from "../../../../index";

chai.use(chaiHttp);

describe("POST /api/users/auth/facebook", () => {
  it("should return an error when passing an invalid token", (done) => {
    chai
      .request(server)
      .post("/api/users/auth/facebook")
      .send({ accessToken: "ksdlfj" })
      .end((err, res) => {
        expect(res).to.has.status(400);
        expect(res.body).to.have.property("success").to.be.false;
        expect(res.body)
          .to.have.property("errors")
          .to.includes("unvalid token");
        done();
      });
  });

  it("when the token is valid, should get the user from the db (if his email exist) or add him to it (if his email does not exist), and return the jwt", (done) => {
    const mockReturn = {
      data: {
        name: faker.name.findName(),
        email: faker.internet.email(),
      },
    };
    const axiosGetStub = sinon.stub(axios, "get").returns(mockReturn);

    chai
      .request(server)
      .post("/api/users/auth/facebook")
      .send({ accessToken: "some valid token" })
      .end((err, res) => {
        expect(res).to.has.status(200);
        expect(res.body).to.have.property("success").to.be.true;
        expect(res.body).to.have.property("data").to.includes("Bearer");

        axiosGetStub.restore();
        done();
      });
  });
});
