import faker from "faker";
import chai, { expect } from "chai";
import sinon from "sinon";
import { GoogleAuth } from "./GoogleAuth";
import { OAuth2Client } from "google-auth-library";

chai.use(require("chai-as-promised"));

describe("GoogleAuth class", () => {
  describe("genereteUserInfo method", () => {
    it("should return the userInfo and put it in the userInfo property when the idToken valid", async () => {
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

      const mockValidIdToken = faker.random.alphaNumeric();
      const googleAuth = new GoogleAuth(mockValidIdToken);

      const userInfo = await googleAuth.generateUserInfo();

      expect(verifyIdTokenStub.calledOnce).to.be.true;
      expect(verifyIdTokenStub.args[0][0])
        .to.have.property("idToken")
        .equal(mockValidIdToken);
      expect(verifyIdTokenStub.args[0][0])
        .to.have.property("audience")
        .equal(process.env.GOOGLE_WEB_CLIENT_ID);

      verifyIdTokenStub.restore();

      expect(userInfo)
        .to.have.property("name", mockReturn.getPayload().name)
        .to.be.a("string");
      expect(userInfo)
        .and.to.have.property("email", mockReturn.getPayload().email)
        .to.be.a("string");
      expect(googleAuth.userInfo)
        .to.have.property("name", mockReturn.getPayload().name)
        .to.be.a("string");
      expect(googleAuth.userInfo)
        .and.to.have.property("email", mockReturn.getPayload().email)
        .to.be.a("string");
    });

    it("should throw an error when the idToken unvalid", async () => {
      const verifyIdTokenSpy = sinon.spy(
        OAuth2Client.prototype,
        "verifyIdToken"
      );

      const mockUnvalidAccessToken = faker.random.alphaNumeric();
      const googleAuth = new GoogleAuth(mockUnvalidAccessToken);

      await expect(googleAuth.generateUserInfo()).to.be.rejected;

      expect(verifyIdTokenSpy.calledOnce).to.be.true;
      expect(verifyIdTokenSpy.args[0][0])
        .to.have.property("idToken")
        .equal(mockUnvalidAccessToken);
      expect(verifyIdTokenSpy.args[0][0])
        .to.have.property("audience")
        .equal(process.env.GOOGLE_WEB_CLIENT_ID);

      verifyIdTokenSpy.restore();

      expect(googleAuth.userInfo).to.be.undefined;
    });
  });
});
