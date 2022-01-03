import { expect } from "chai";
import { BcryptPassword } from "./BcryptPassword";

describe("Bcrypt class", () => {
  describe("generateHash methode", () => {
    it("should generate a hash from the password given and assign it to the class variable (hash)", async () => {
      const mockPassword = "hello there";
      const bcryptPassword = new BcryptPassword(mockPassword);
      const hash = await bcryptPassword.generateHash();

      expect(hash).to.be.a.string;
      expect(bcryptPassword.hash).to.be.a.string;
      expect(hash).to.equal(bcryptPassword.hash);
    });
  });

  describe("compareValueWithHash methode", () => {
    const mockPassword = "hello there";
    const bcryptPassword = new BcryptPassword(mockPassword);

    it("should return true if the password is correct", async () => {
      await bcryptPassword.generateHash();
      await bcryptPassword.compareValueWithHash();

      expect(bcryptPassword.isMatch).to.be.true;
    });

    it("should return false if the password in wrong", async () => {
      bcryptPassword.value = "";
      await bcryptPassword.compareValueWithHash();

      expect(bcryptPassword.isMatch).to.be.false;
    });
  });
});
