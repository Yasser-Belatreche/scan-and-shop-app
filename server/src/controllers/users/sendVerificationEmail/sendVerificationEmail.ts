import { Request, Response } from "express";

// global utils
import { JSONResponse } from "../../../utils/__classes__/JSONResponse/JSONResponse";
import { User } from "../../../utils/__classes__/User/User";

// local utils
import { Validator } from "../__utils__/__classes__/Validator/Validator";
import { VerificationCode } from "../__utils__/__classes__/VerificationCode/VerificationCode";
import { VerificationEmail } from "../__utils__/__classes__/VerificationEmail/VerificationEmail";

const sendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const isValidEmail = Validator.isValidEmail(req.body.email);
    if (!isValidEmail) {
      return JSONResponse.invalidBodyValuesError(res, {
        email: "must be a valid email",
      });
    }

    const user = new User({ email: req.body.email });
    const isExist = await user.isExist();
    if (!isExist) {
      return JSONResponse.invalidBodyValuesError(res, {
        email: "no user associated with this email",
      });
    }

    const { userId, email } = await user.generateInfo();
    const verificationCode = new VerificationCode({ userId });
    const code = verificationCode.generateCode();

    const isUserHasCodeInDb = await verificationCode.isExistInDb();
    if (isUserHasCodeInDb) await verificationCode.updateInDb();
    else await verificationCode.addToDb();

    const verificationEmail = new VerificationEmail({ email, code });
    await verificationEmail.send();

    return JSONResponse.success(
      res,
      `the verification code sent successfully to ${email}`
    );
  } catch (error) {
    JSONResponse.serverError(
      res,
      new Error(`Send Verification Email Error: ${error}`)
    );
  }
};

export { sendVerificationEmail };
