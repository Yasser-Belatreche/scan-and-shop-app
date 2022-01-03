import jwt from "jsonwebtoken";

class JWT {
  constructor() {}

  public static sign(value: any): string {
    const token: string = jwt.sign(value, `${process.env.JWT_SECRET_KEY}`);
    return token;
  }

  public static decode(sign: string): any {
    const decodedValue: any = jwt.verify(sign, `${process.env.JWT_SECRET_KEY}`);
    return decodedValue;
  }
}

export { JWT };
