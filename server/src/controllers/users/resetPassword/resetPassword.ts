import { Request, Response } from "express";

// global utils
import { JSONResponse } from "../../../utils/__classes__/JSONResponse/JSONResponse";
import { User } from "../../../utils/__classes__/User/User";

// local utils
import { BcryptPassword } from "../__utils__/__classes__/BcryptPassword/BcryptPassword";
import { Validator } from "../__utils__/__classes__/Validator/Validator";
import { ResetPasswordBody } from "./resetPassword.types";

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { isValid, errors } = Validator.validateResetPasswordBody(
      req.body as ResetPasswordBody
    );
    if (!isValid) return JSONResponse.invalidBodyValuesError(res, errors);

    const userId = Number(req.headers.userId);

    const user = new User({ userId });
    const bcryptPassword = new BcryptPassword(req.body.password);
    const hash = await bcryptPassword.generateHash();
    await user.resetPassword(hash);

    JSONResponse.success(
      res,
      `password of the user with id ${userId} has successfully changed`
    );
  } catch (error) {
    JSONResponse.serverError(res, new Error(`Reset Password Error: ${error}`));
  }
};

export { resetPassword };
