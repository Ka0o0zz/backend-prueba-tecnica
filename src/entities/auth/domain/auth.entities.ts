import {
  emailValidator,
  extractPhoneNumber,
  fixCallsign,
} from "../../../helpers";
import { comparePassword, hashPassword } from "../../../toolsConfig";

export interface Register {
  name: string;
  lastName: string;
  email: string;
  phone: {
    callsign: string;
    number: string;
  };
  password: string;
}

export interface ValidatePassword {
  password: string;
  hashedPassword: string;
}

export interface Login {
  email: string;
  password: string;
}

export class Auth {
  constructor() {}

  public async register({
    name,
    lastName,
    email,
    phone: { callsign, number },
    password,
  }: Register) {
    if (!emailValidator(email)) throw new Error("Email no validate");

    const fixedCallsign = fixCallsign(callsign);
    const fixedPhoneNumber = extractPhoneNumber(number);

    const hashedPassword = await hashPassword(password);

    return {
      name,
      lastName,
      email,
      phone: {
        callsign: fixedCallsign,
        number: fixedPhoneNumber,
      },
      password: hashedPassword,
    };
  }

  public async validPassword({ password, hashedPassword }: ValidatePassword) {
    return await comparePassword(password, hashedPassword);
  }
}
