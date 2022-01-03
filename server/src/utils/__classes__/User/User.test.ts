import chai, { expect } from "chai";
import faker from "faker";
import { BcryptPassword } from "../../../controllers/users/__utils__/__classes__/BcryptPassword/BcryptPassword";
import { User } from "./User";

chai.use(require("chai-as-promised"));

describe("User class", () => {
  const mockUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(),
  };

  describe("generateInfo method", () => {
    it('should throw an error when "userId" or "email" properties is undefined', async () => {
      const user = new User();
      await expect(user.generateInfo()).to.be.rejectedWith(
        "one of User.userId, User.email must be defined"
      );
    });

    it("should get user info when passing just the email and update the difference properties", async () => {
      const user = new User({ email: "yasser@gmail.com" });
      const { userId, name, email, password } = await user.generateInfo();

      expect(user.userId).to.be.a("number").equal(userId);
      expect(user.name).to.be.a("string").equal(name);
      expect(user.email).to.be.a("string").equal(email);
      expect(user.password).to.be.a("string").equal(password);
    });

    it("should get user info when passing just the userId and update the different properties", async () => {
      const user = new User({ userId: 14 });
      const { userId, name, email, password } = await user.generateInfo();

      expect(user.userId).to.be.a("number").equal(userId);
      expect(user.name).to.be.a("string").equal(name).equal("yasser");
      expect(user.email)
        .to.be.a("string")
        .equal(email)
        .equal("yasser@gmail.com");
      expect(user.password).to.be.a("string").equal(password);
    });

    it("should throw an error if the user does not exist in db", async () => {
      const user = new User({ userId: -1 });
      await expect(user.generateInfo()).to.be.rejectedWith(
        "user does not exist"
      );
    });
  });

  describe("addToDb method", () => {
    it('should throw an error when one of the user property is undefined (except "userId" and "picture")', async () => {
      const user = new User();
      await expect(user.addToDb()).to.be.rejectedWith(
        "one of User.name, User.email, User.password or more are not defined"
      );
    });

    it("should return the user info when the user added successfully and update User.userId property", async () => {
      const user = new User(mockUser);
      const { userId, name, email, password } = await user.addToDb();

      expect(user.userId).to.be.a("number").equal(userId);
      expect(user.name).to.be.a("string").equal(name);
      expect(user.email).to.be.a("string").equal(email);
      expect(user.password).to.be.a("string").equal(password);
    });
  });

  describe("isExist method", () => {
    it("should return false if the user does not exist", async () => {
      const user = new User({ userId: -1 });
      await expect(user.isExist()).to.eventually.equal(false);
    });

    it("should return true if the user exist", async () => {
      const user = new User({ userId: 14 });
      await expect(user.isExist()).to.eventually.equal(true);
    });
  });

  describe("setVerified method", () => {
    it("should throw an error when no userId in the instance", async () => {
      const user = new User();
      await expect(user.setVerified()).to.be.rejectedWith("no userId");
    });

    it("should update the verified property in the db and in this instance", async () => {
      const user = new User({ userId: 14 });

      const userInfo = await user.setVerified();

      expect(user.info).to.have.property("verified").to.be.true;
      expect(userInfo).to.have.property("verified").to.be.true;
    });
  });

  describe("resetPassword method", () => {
    it("should throw an error when no userId in the instance", async () => {
      const user = new User();
      await expect(user.setVerified()).to.be.rejectedWith("no userId");
    });

    it("should update the password in the db and in this instance", async () => {
      const user = new User({ userId: 285 });
      const oldInfo = await user.generateInfo();

      const newPassword = new BcryptPassword("yasser2002");
      const hash = await newPassword.generateHash();

      const newInfo = await user.resetPassword(hash);

      expect(oldInfo).to.have.property("password").to.not.equal(hash);
      expect(newInfo).to.have.property("password").to.equal(hash);
    });
  });
});
