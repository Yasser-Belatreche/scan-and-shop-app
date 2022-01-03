import { Request, Response } from "express";

// global utils
import { User } from "../../../../utils/__classes__/User/User";
import { JSONResponse } from "../../../../utils/__classes__/JSONResponse/JSONResponse";
import { JWT } from "../../../../utils/__classes__/JWT/JWT";

// local utils
import { GoogleAuth } from "./__utils__/GoogleAuth";
import { BcryptPassword } from "../../__utils__/__classes__/BcryptPassword/BcryptPassword";
import { getRandomPassword } from "../__utils__/getRandomPassword";

const googleAuth = async (req: Request, res: Response) => {
  try {
    const googleUser = new GoogleAuth(req.body.idToken);
    try {
      await googleUser.generateUserInfo();
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
      name: googleUser.userInfo?.name,
      email: googleUser.userInfo?.email,
      password: passwordHash,
      picture: googleUser.userInfo?.picture,
    });

    const isUserExist = await user.isExist();

    if (isUserExist) await user.generateInfo();
    else await user.addToDb();

    const token = JWT.sign({ userId: user.userId });

    return JSONResponse.success(res, `Bearer ${token}`);
  } catch (error) {
    return JSONResponse.serverError(
      res,
      new Error(`GoogleAuth Error: ${error}`)
    );
  }
};

export { googleAuth };
