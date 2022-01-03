import { User } from "../../../../../utils/__classes__/User/User";
import { LoginBody } from "../../../login/login.types";
import { ResetPasswordBody } from "../../../resetPassword/resetPassword.types";
import { SignupBody } from "../../../singup/signup.types";

class Validator {
  public static validateLoginBody(values: LoginBody) {
    const { email, password } = values;
    const errors: Partial<LoginBody> = {};

    if (!Validator.isValidEmail(email)) errors.email = "must be a valid email";
    if (password.trim().length < 8) {
      errors.password = "must have at least 8 characters";
    }

    if (!Object.keys(errors).length) return { isValid: true };
    else return { isValid: false, errors };
  }

  public static async validateSignupBody(values: SignupBody) {
    const { email, name, password } = values;
    const errors: Partial<SignupBody> = {};

    if (!name.trim()) errors.name = "must not be empty";

    if (!Validator.isValidEmail(email)) {
      errors.email = "must be a valid email";
    } else {
      const user = new User(values);
      const isExist = await user.isExist();
      if (isExist) errors.email = "email already in use";
    }

    if (password.trim().length < 8) {
      errors.password = "must have at least 8 characters";
    }

    if (!Object.keys(errors).length) return { isValid: true };
    else return { isValid: false, errors };
  }

  public static validateResetPasswordBody(values: ResetPasswordBody) {
    const { password, confirmPassword } = values;
    const errors: Partial<ResetPasswordBody> = {};

    if (password.trim().length < 8) {
      errors.password = "must have at least 8 characters";
    }
    if (password.trim() !== confirmPassword.trim()) {
      errors.confirmPassword = "password did not match";
    }

    if (!Object.keys(errors).length) return { isValid: true };
    else return { isValid: false, errors };
  }

  public static isValidEmail(e: string) {
    const regex: RegExp =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (e.trim().match(regex)) return true;
    return false;
  }
}

export { Validator };
