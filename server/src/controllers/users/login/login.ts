import { Request, Response } from "express";

// global utils
import { JWT } from "../../../utils/__classes__/JWT/JWT";
import { JSONResponse } from "../../../utils/__classes__/JSONResponse/JSONResponse";
import { User } from "../../../utils/__classes__/User/User";

// local utils
import { LoginBody } from "./login.types";
import { BcryptPassword } from "../__utils__/__classes__/BcryptPassword/BcryptPassword";
import { Validator } from "../__utils__/__classes__/Validator/Validator";

const login = async (req: Request, res: Response) => {
  try {
    const { isValid, errors } = Validator.validateLoginBody(
      req.body as LoginBody
    );
    if (!isValid) return JSONResponse.invalidBodyValuesError(res, errors);

    const user = new User(req.body);

    const isExist = await user.isExist();
    if (!isExist) return JSONResponse.credentialsError(res);

    const { password: realPasswordHash } = await user.generateInfo();
    const bcryptPassword = new BcryptPassword(
      req.body.password,
      realPasswordHash
    );
    await bcryptPassword.compareValueWithHash();

    if (!bcryptPassword.isMatch) return JSONResponse.credentialsError(res);

    const userToken: string = JWT.sign({ userId: user.userId });

    return JSONResponse.success(res, `Bearer ${userToken}`);
  } catch (error) {
    return JSONResponse.serverError(res, new Error(`Login Error: ${error}`));
  }
};

export { login };
