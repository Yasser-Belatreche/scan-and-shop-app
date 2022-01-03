import { db } from "../../../db";

interface IUser {
  userId?: number;
  name?: string;
  email?: string;
  password?: string;
  picture?: string;
  verified?: boolean;
}

class User implements IUser {
  private _userId?: number;
  private _name?: string;
  private _email?: string;
  private _password?: string;
  private _picture?: string;
  private _verified?: boolean;

  constructor(user?: IUser) {
    if (user?.userId) this._userId = user.userId;
    if (user?.name) this._name = user.name.trim();
    if (user?.email) this._email = user.email.trim();
    if (user?.password) this._password = user.password.trim();
    if (user?.picture) this._picture = user.picture.trim();
    if (user?.verified) this._verified = user.verified;
  }

  public get userId() {
    return this._userId;
  }
  public get name() {
    return this._name;
  }
  public get email() {
    return this._email;
  }
  public get password() {
    return this._password;
  }
  public get picture() {
    return this._picture;
  }
  public get verified() {
    return this._verified;
  }
  public get info(): IUser {
    return {
      userId: this._userId,
      name: this._name,
      email: this._email,
      password: this._password,
      picture: this._picture,
      verified: this._verified,
    };
  }

  public async generateInfo() {
    try {
      if (this.noEmailOrUserId()) {
        throw "one of User.userId, User.email must be defined";
      }

      const query = `SELECT * FROM users WHERE ${
        this._userId ? "user_id" : "email"
      }=$1`;
      const params = this._userId ? [this._userId] : [this._email];
      const { rows } = await db.query(query, params);

      if (!rows.length) throw "user does not exist";

      this._userId = rows[0].user_id;
      this._name = rows[0].name;
      this._email = rows[0].email;
      this._password = rows[0].password;
      this._picture = rows[0].picture;

      return this.info;
    } catch (error) {
      throw new Error(
        `Something went wrong at User.generateInfo(), error: ${error}`
      );
    }
  }

  public async addToDb() {
    try {
      if (this.noPropertyToAddInDb()) {
        throw "one of User.name, User.email, User.password or more are not defined";
      }

      const query = `INSERT INTO users(name, email, password, picture) VALUES ($1, $2, $3, $4) RETURNING *`;
      const params = [this._name, this._email, this._password, this._picture];
      const { rows } = await db.query(query, params);

      this._userId = rows[0].user_id;
      return this.info;
    } catch (error) {
      throw new Error(
        `Something went wrong at User.addToDb(), error: ${error}`
      );
    }
  }

  public async isExist() {
    try {
      await this.generateInfo();
      return true;
    } catch (error) {
      return false;
    }
  }

  public async setVerified() {
    try {
      if (!this._userId) throw "no userId in this instance";

      const query = `
        UPDATE users
        SET verified = true 
        WHERE user_id = $1
        RETURNING *
      `;
      const params = [this._userId];
      const { rows } = await db.query(query, params);

      if (!rows.length) throw "user does not exist";

      this._verified = rows[0].verified;

      return rows[0];
    } catch (error) {
      throw new Error(
        `Something went wrong at User.setVerified(), error: ${error}`
      );
    }
  }

  public async resetPassword(newPassword: string) {
    try {
      if (!this._userId) throw "no userId in this instance";

      const query = `
        UPDATE users
        SET password = $1
        WHERE user_id = $2
        RETURNING *
      `;
      const params = [newPassword, this._userId];
      const { rows } = await db.query(query, params);

      this._password = rows[0].password;

      return rows[0];
    } catch (error) {
      throw new Error(
        `Something went wrong at User.resetPassword(), error: ${error}`
      );
    }
  }

  private noEmailOrUserId() {
    return !(this._email || this._userId);
  }

  private noPropertyToAddInDb() {
    return !this._name || !this._email || !this._password;
  }
}

export { User };
