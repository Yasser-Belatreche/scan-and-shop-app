import { Request, Response } from "express";

// global utlils
import { JSONResponse } from "../../../utils/__classes__/JSONResponse/JSONResponse";
import { JWT } from "../../../utils/__classes__/JWT/JWT";
import { User } from "../../../utils/__classes__/User/User";
import { Validator } from "../__utils__/__classes__/Validator/Validator";

// local utils
import { isVerificationCodeCorrect } from "../__utils__/__functions__/isVerificationCodeCorrect";

const verifyCode = async (req: Request, res: Response) => {
  try {
    const isValidEmail = Validator.isValidEmail(req.body.email);
    if (!isValidEmail) {
      return JSONResponse.invalidBodyValuesError(res, "must be a valid email");
    }

    const user = new User({ email: req.body.email });
    const isUserExist = await user.isExist();
    if (!isUserExist) {
      return JSONResponse.invalidBodyValuesError(
        res,
        "no user with the associated email"
      );
    }

    const isCodeCorrect = await isVerificationCodeCorrect({
      userId: user.userId as number,
      code: req.body.code,
    });
    if (!isCodeCorrect) {
      return JSONResponse.invalidBodyValuesError(
        res,
        "wrong verification code, please try again"
      );
    }

    await user.setVerified();

    const token = JWT.sign({ userId: user.userId });

    return JSONResponse.success(res, `Bearer ${token}`);
  } catch (error) {
    JSONResponse.serverError(res, new Error(`Verify Code Error: ${error}`));
  }
};

export { verifyCode };
