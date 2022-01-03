import { Request, Response } from "express";

// global utils
import { User } from "../../../../utils/__classes__/User/User";
import { JSONResponse } from "../../../../utils/__classes__/JSONResponse/JSONResponse";
import { JWT } from "../../../../utils/__classes__/JWT/JWT";

// local utils
import { FacebookAuth } from "./__utils__/FacebookAuth";
import { BcryptPassword } from "../../__utils__/__classes__/BcryptPassword/BcryptPassword";
import { getRandomPassword } from "../__utils__/getRandomPassword";

const facebookAuth = async (req: Request, res: Response) => {
  try {
    const facebookUser = new FacebookAuth(req.body.accessToken);
    try {
      await facebookUser.generateUserInfo();
    } catch (error) {
      return JSONResponse.invalidBodyValuesError(
        res,
        `unvalid token, ${error}`
      );
    }

    const bcryptPassword = new BcryptPassword(
      getRandomPassword() // generate a random password for the user
    );
    const passwordHash = await bcryptPassword.generateHash();

    const user = new User({
      name: facebookUser.userInfo?.name,
      email: facebookUser.userInfo?.email,
      password: passwordHash,
    });

    const isUserExist = await user.isExist();

    if (isUserExist) await user.generateInfo();
    else await user.addToDb();

    const token = JWT.sign({ userId: user.userId });

    return JSONResponse.success(res, `Bearer ${token}`);
  } catch (error) {
    return JSONResponse.serverError(
      res,
      new Error(`FacebookAuth Error: ${error}`)
    );
  }
};

export { facebookAuth };
