import bcrypt from "bcrypt";

class BcryptPassword {
  private _value: string = "";
  private _hash: string = "";
  private _isMatch: boolean = true;

  constructor(value: string, hash?: string) {
    this._value = value.trim();
    if (hash) this._hash = hash.trim();
  }

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = v;
  }

  get hash() {
    return this._hash;
  }

  get isMatch() {
    return this._isMatch;
  }

  public async generateHash(): Promise<string> {
    try {
      this._hash = await bcrypt.hash(this.value, 10);
      return this._hash;
    } catch (error) {
      throw new Error(
        `Something went wrong at BcryptPassword.generateHash(), ${error}`
      );
    }
  }

  public async compareValueWithHash(): Promise<void> {
    try {
      this._isMatch = await bcrypt.compare(this._value, this._hash);
    } catch (error) {
      throw new Error(
        `Something went wrong at BcryptPassword.compareValueWithHash(), ${error}`
      );
    }
  }
}

export { BcryptPassword };
