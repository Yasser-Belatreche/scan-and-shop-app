import { expect } from "chai";
import { VerificationCode } from "./VerificationCode";

// ! test the add, delete, update and get from DB methods
describe("VerificationCode class", () => {
  describe("generateCode method", () => {
    it("should return a random verification code from 4 numbers", () => {
      const user = new VerificationCode({ userId: 3 });
      expect(user.generateCode())
        .to.be.a("number")
        .greaterThanOrEqual(1000)
        .and.lessThanOrEqual(9999);
      expect(user.generateCode()).to.not.equal(user.generateCode());
    });
  });
});
