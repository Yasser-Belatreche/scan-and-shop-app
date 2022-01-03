import { db } from "../../../../../db";

interface IVerificationCode {
  userId?: number;
  code?: number;
}

class VerificationCode {
  private _userId?: number;
  private _code?: number;

  constructor(params: Omit<IVerificationCode, "code">) {
    this._userId = params.userId;
  }

  get userId() {
    return this._userId;
  }
  get code() {
    return this._code;
  }

  public generateCode(): number {
    try {
      if (!this._userId) throw "no userId in this instance";

      let code;
      do {
        code = Math.round(Math.random() * 10 ** 4);
      } while (code < 1000 || code > 9999);
      this._code = code;

      return code;
    } catch (error) {
      throw new Error(
        `Something went wrong at VerificationCode.generateCode(), error: ${error}`
      );
    }
  }

  public async addToDb(): Promise<void> {
    try {
      if (!this._userId || !this._code)
        throw `no userId or you didn't generate the code yet`;

      const query = `
        INSERT INTO verification_codes (user_id, code)
        VALUES ($1, $2)
      `;
      const params = [this.userId, this.code];

      await db.query(query, params);
    } catch (error) {
      throw new Error(
        `Someting went wrong at VerificationCode.addToDb(), error: ${error}`
      );
    }
  }

  public async deleteFromDb(): Promise<void> {
    try {
      if (!this._userId) throw "no userId in this instance";

      const query = `
        DELETE FROM verification_codes
        WHERE user_id = $1
      `;
      const params = [this._userId];

      await db.query(query, params);
    } catch (error) {
      throw new Error(
        `Someting went wrong at VerificationCode.deleteFromDb(): ${error}`
      );
    }
  }

  public async getFromDb(): Promise<number> {
    try {
      if (!this._userId) throw "no userId in this instance";

      const query = `
        SELECT * FROM verification_codes
        WHERE user_id = $1
      `;
      const params = [this._userId];
      const { rows } = await db.query(query, params);

      if (!rows.length) throw "verification code not exist for this user";

      this._code = rows[0].code;

      return rows[0].code;
    } catch (error) {
      throw new Error(
        `Someting went wrong at VerificationCode.getFromDb(): ${error}`
      );
    }
  }

  public async updateInDb() {
    try {
      if (!this._userId || !this._code)
        throw `no userId or you didn't generate the code yet`;

      const query = `
        UPDATE verification_codes
        SET code = $1
        WHERE user_id = $2
        RETURNING *
      `;
      const params = [this._code, this._userId];

      await db.query(query, params);
    } catch (error) {
      throw new Error(
        `Someting went wrong at VerificationCode.updateInDb(): ${error}`
      );
    }
  }

  public async isExistInDb() {
    try {
      if (!this._userId) throw "no userId in this instance";

      const query = `
        SELECT * FROM verification_codes
        WHERE user_id = $1
      `;
      const params = [this._userId];
      const { rowCount } = await db.query(query, params);

      if (!rowCount) return false;

      return true;
    } catch (error) {
      return false;
    }
  }
}

export { VerificationCode };
