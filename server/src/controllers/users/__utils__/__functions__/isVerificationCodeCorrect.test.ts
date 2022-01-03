import chai, { expect } from "chai";
import Sinon from "sinon";
import { VerificationCode } from "../__classes__/VerificationCode/VerificationCode";
import { isVerificationCodeCorrect } from "./isVerificationCodeCorrect";

chai.use(require("chai-as-promised"));

describe("isVerificationCodeCorrect function", async () => {
  let getCodeFromDbSpy: Sinon.SinonSpy;
  let deleteCodeFromDbSpy: Sinon.SinonSpy;

  beforeEach(() => {
    getCodeFromDbSpy = Sinon.spy(VerificationCode.prototype, "getFromDb");
    deleteCodeFromDbSpy = Sinon.spy(VerificationCode.prototype, "deleteFromDb");
  });

  afterEach(() => {
    getCodeFromDbSpy.restore();
    deleteCodeFromDbSpy.restore();
  });

  // to make sure the code exist
  const verificationCode = new VerificationCode({ userId: 14 });
  const code = verificationCode.generateCode();
  await verificationCode.deleteFromDb();
  await verificationCode.addToDb();

  it("should return false when the code is wrong", async () => {
    const isCorrect = await isVerificationCodeCorrect({
      userId: 14,
      code: 321,
    });

    expect(getCodeFromDbSpy.calledOnce).to.be.true;
    expect(deleteCodeFromDbSpy.calledOnce).to.be.false;
    expect(isCorrect).to.be.false;
  });

  it("should return true if the code is correct and delete it from db", async () => {
    const isCorrect = await isVerificationCodeCorrect({
      userId: 14,
      code,
    });

    expect(getCodeFromDbSpy.calledOnce).to.be.true;
    expect(deleteCodeFromDbSpy.calledOnce).to.be.true;
    expect(isCorrect).to.be.true;
  });
});
