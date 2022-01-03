import { NextFunction, Request, Response } from "express";
import { JSONResponse } from "../utils/__classes__/JSONResponse/JSONResponse";
import { JWT } from "../utils/__classes__/JWT/JWT";
import { User } from "../utils/__classes__/User/User";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization?.includes("Bearer")) {
    return JSONResponse.notAuthorizeError(res, "No token in the headers");
  }

  try {
    const { authorization } = req.headers;
    const token = authorization.split("Bearer ")[1];

    const decodedToken = JWT.decode(token);

    if (!decodedToken.userId) {
      return JSONResponse.notAuthorizeError(
        res,
        "the token sent does not have a userId property"
      );
    }

    const user = new User({ userId: decodedToken.userId });
    const isExist = await user.isExist();

    if (!isExist) {
      return JSONResponse.notAuthorizeError(
        res,
        "User in the headers not exist"
      );
    }

    req.headers.userId = decodedToken.userId;

    next();
  } catch (error) {
    JSONResponse.serverError(res, new Error(`Auth midllware Error: ${error}`));
  }
};

export { auth };
