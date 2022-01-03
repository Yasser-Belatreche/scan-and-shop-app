import { expect } from "chai";
import { JWT } from "./JWT";

describe("JWT class", () => {
  let token: string;
  describe("sign method", () => {
    it("should sign a given value and return the jwt", () => {
      token = JWT.sign({ userId: 10 });
      expect(token).to.be.a.string;
    });
  });

  describe("decode method", () => {
    it("should decode a given token and return the decoded value", () => {
      const decodedValue = JWT.decode(token);
      expect(decodedValue).to.have.property("userId").to.be.equal(10);
    });
  });
});
