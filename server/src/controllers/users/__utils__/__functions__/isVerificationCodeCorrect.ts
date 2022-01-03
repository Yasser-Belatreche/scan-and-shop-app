import { VerificationCode } from "../__classes__/VerificationCode/VerificationCode";

interface Params {
  userId: number;
  code: number;
}

const isVerificationCodeCorrect = async (params: Params): Promise<boolean> => {
  try {
    const verificationCode = new VerificationCode({ userId: params.userId });
    const codeInDb = await verificationCode.getFromDb();

    if (codeInDb !== params.code) return false;

    await verificationCode.deleteFromDb();
    return true;
  } catch (error) {
    throw new Error(
      `Something went wrong at isVerificationCodeCorrect(), error: ${error}`
    );
  }
};

export { isVerificationCodeCorrect };
