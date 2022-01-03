import { Response } from "express";
import { PoolClient } from "pg";

enum Errors {
  SERVER,
  CREDENTIALS,
  INVALIDE_BODY,
}

class JSONResponse {
  constructor() {}

  public static success(res: Response, data: any) {
    return res.status(200).json({ success: true, data });
  }

  public static serverError(res: Response, e: Error, client?: PoolClient) {
    client?.query("ROLLBACK");
    return res.status(500).json({ success: false, errors: e.message });
  }

  public static credentialsError(res: Response) {
    return res.status(400).json({
      success: false,
      errors: { credentials: "credentials error, please try again" },
    });
  }

  public static invalidBodyValuesError(res: Response, errors: any) {
    return res.status(400).json({ success: false, errors });
  }

  public static notAuthorizeError(res: Response, error?: string) {
    return res.status(401).json({
      success: false,
      errors: `Action not autorized, ${error}`,
    });
  }
}

export { JSONResponse, Errors };
