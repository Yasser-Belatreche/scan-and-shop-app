import { expect } from "chai";
import { Validator } from "./Validator";

describe("Validator Class", () => {
  describe("isValidEmail methode", () => {
    it("should return false when unvalid email format", () => {
      expect(Validator.isValidEmail("hl")).to.be.false;
    });

    it("should return true when valid email format", () => {
      expect(Validator.isValidEmail("hl@gmail.com")).to.be.true;
    });
  });

  describe("validateLoginBody methode", () => {
    it("should return errors object with unvalid values", () => {
      const body = {
        email: "",
        password: "",
      };

      const { isValid, errors } = Validator.validateLoginBody(body);

      expect(errors).to.have.property("email").to.includes("be a valid email");
      expect(errors)
        .to.have.property("password")
        .to.include("at least 8 characters");
      expect(isValid).to.be.false;
    });

    it("should return true with valid values", async () => {
      const body = {
        email: "sdfsdf@gmail.com",
        password: "helsf884",
      };

      const { isValid, errors } = Validator.validateLoginBody(body);

      expect(errors).to.be.undefined;
      expect(isValid).to.be.true;
    });
  });

  describe("validateSignupBody methode", () => {
    it("should return errors with unvalid values", async () => {
      const body = {
        name: "",
        email: "klsjf",
        password: "sdf",
      };

      const { isValid, errors } = await Validator.validateSignupBody(body);

      expect(isValid).to.be.false;
      expect(errors).to.have.property("name").to.includes("not be empty");
      expect(errors).to.have.property("email").to.include("be a valid email");
      expect(errors)
        .to.have.property("password")
        .to.includes("at least 8 characters");
    });

    it("should return errors with used email", async () => {
      const body = {
        name: "Yasser",
        email: "yasser@gmail.com",
        password: "yasser 983",
      };

      const { isValid, errors } = await Validator.validateSignupBody(body);

      expect(isValid).to.be.false;
      expect(errors).to.not.have.property("name");
      expect(errors).to.not.have.property("password");
      expect(errors).to.have.property("email").to.includes("already in use");
    });

    it("should return true with valid values", async () => {
      const body = {
        name: "Yasser",
        email: "sdfsdf@gmail.com",
        password: "helsf884",
      };

      const { isValid, errors } = await Validator.validateSignupBody(body);

      expect(isValid).to.be.true;
      expect(errors).to.be.undefined;
    });
  });

  describe("validateResetPasswordBody methode", () => {
    it("should return password error with password less than 8 characters", async () => {
      const body = {
        password: "sdf",
        confirmPassword: "sldkf",
      };

      const { isValid, errors } = Validator.validateResetPasswordBody(body);

      expect(isValid).to.be.false;
      expect(errors)
        .to.have.property("password")
        .to.includes("at least 8 characters");
    });

    it("should return confirmPassword error when he didn't match the password", async () => {
      const body = {
        password: "sdsdfsdff",
        confirmPassword: "sldsssssssskf",
      };

      const { isValid, errors } = Validator.validateResetPasswordBody(body);

      expect(isValid).to.be.false;
      expect(errors)
        .to.have.property("confirmPassword")
        .to.includes("did not match");
    });

    it("should return true with valid values", async () => {
      const body = {
        password: "sdsdfsdff",
        confirmPassword: "sdsdfsdff",
      };

      const { isValid, errors } = Validator.validateResetPasswordBody(body);

      expect(isValid).to.be.true;
      expect(errors).to.be.undefined;
    });
  });
});
