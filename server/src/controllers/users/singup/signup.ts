import { Request, Response } from "express";

// global utils
import { JSONResponse } from "../../../utils/__classes__/JSONResponse/JSONResponse";
import { User } from "../../../utils/__classes__/User/User";
import { JWT } from "../../../utils/__classes__/JWT/JWT";

// local utils
import { SignupBody } from "./signup.types";
import { Validator } from "../__utils__/__classes__/Validator/Validator";
import { BcryptPassword } from "../__utils__/__classes__/BcryptPassword/BcryptPassword";
import { VerificationEmail } from "../__utils__/__classes__/VerificationEmail/VerificationEmail";
import { VerificationCode } from "../__utils__/__classes__/VerificationCode/VerificationCode";

const signup = async (req: Request, res: Response) => {
  try {
    const { isValid, errors } = await Validator.validateSignupBody(
      req.body as SignupBody
    );
    if (!isValid) return JSONResponse.invalidBodyValuesError(res, errors);

    const bcryptPassword = new BcryptPassword(req.body.password);
    const passwordHash = await bcryptPassword.generateHash();

    const user = new User({ ...req.body, password: passwordHash });
    const { userId, email } = await user.addToDb();

    const verificationCode = new VerificationCode({ userId });
    const code = verificationCode.generateCode();
    await verificationCode.addToDb();

    const verificationEmail = new VerificationEmail({ email, code });
    await verificationEmail.send();

    const userToken: string = JWT.sign({ userId });

    return JSONResponse.success(res, `Bearer ${userToken}`);
  } catch (error) {
    return JSONResponse.serverError(res, new Error(`Signup Error: ${error}`));
  }
};

export { signup };
