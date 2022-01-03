import faker from "faker";
import chai, { expect } from "chai";
import sinon from "sinon";
import axios from "axios";
import { FacebookAuth } from "./FacebookAuth";

chai.use(require("chai-as-promised"));

describe("FacebookAuth class", () => {
  describe("genereteUserInfo method", () => {
    it("should return the userInfo and put it in the userInfo property when the accessToken valid", async () => {
      const mockReturn = {
        data: {
          name: faker.name.findName(),
          email: faker.internet.email(),
        },
      };
      const axiosGetStub = sinon.stub(axios, "get").returns(mockReturn);

      const mockValidAccessToken = faker.random.alphaNumeric();
      const facebookAuth = new FacebookAuth(mockValidAccessToken);

      const userInfo = await facebookAuth.generateUserInfo();

      expect(axiosGetStub.calledOnce).to.be.true;
      expect(axiosGetStub.args[0][0]).includes(mockValidAccessToken);

      axiosGetStub.restore();

      expect(userInfo)
        .to.have.property("name", mockReturn.data.name)
        .to.be.a("string");
      expect(userInfo)
        .and.to.have.property("email", mockReturn.data.email)
        .to.be.a("string");
      expect(facebookAuth.userInfo)
        .to.have.property("name", mockReturn.data.name)
        .to.be.a("string");
      expect(facebookAuth.userInfo)
        .and.to.have.property("email", mockReturn.data.email)
        .to.be.a("string");
    });

    it("should throw an error when the accessToken unvalid", async () => {
      const axiosGetSpy = sinon.spy(axios, "get");

      const mockUnvalidAccessToken = faker.random.alphaNumeric();
      const facebookAuth = new FacebookAuth(mockUnvalidAccessToken);

      await expect(facebookAuth.generateUserInfo()).to.be.rejected;

      expect(axiosGetSpy.calledOnce).to.be.true;
      expect(axiosGetSpy.args[0][0]).includes(mockUnvalidAccessToken);

      axiosGetSpy.restore();

      expect(facebookAuth.userInfo).to.be.undefined;
    });
  });
});
