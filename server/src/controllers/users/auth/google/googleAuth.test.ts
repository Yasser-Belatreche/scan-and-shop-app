import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import faker from "faker";
import sinon from "sinon";
import { OAuth2Client } from "google-auth-library";

import { server } from "../../../../index";

chai.use(chaiHttp);

describe("POST /api/users/auth/google", () => {
  it("should return an error when passing an invalid token", (done) => {
    chai
      .request(server)
      .post("/api/users/auth/google")
      .send({ idToken: "ksdlfj" })
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
      getPayload: () => ({
        aud: faker.random.word(),
        exp: faker.datatype.number(),
        iat: faker.datatype.number(),
        iss: faker.random.word(),
        sub: faker.random.word(),
        name: "random",
        email: "random@email.com",
        picture: "https://randomPic.com",
      }),
    };
    const verifyIdTokenStub = sinon
      .stub(OAuth2Client.prototype, "verifyIdToken")
      .returns(mockReturn);

    chai
      .request(server)
      .post("/api/users/auth/google")
      .send({ idToken: "some valid token" })
      .end((err, res) => {
        expect(res).to.has.status(200);
        expect(res.body).to.have.property("success").to.be.true;
        expect(res.body).to.have.property("data").to.includes("Bearer ");

        verifyIdTokenStub.restore();
        done();
      });
  });
});
