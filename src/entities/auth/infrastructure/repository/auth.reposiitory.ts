import { generateJWT } from "../../../../toolsConfig";
import { Auth, Login, Register } from "../../domain/auth.entities";

export class AuthRepository {
  constructor() {}

  public async register(userToRegister: Register) {
    // This is what I would do if I had the time to set this up in a database

    // const userExist = await findUser({ email: user.email });
    // if (userExist)
    //   throw new authErrorUserAlreadyRegistered(
    //     "This email is already registered"
    //   );

    const newUser = await new Auth().register(userToRegister);
    return newUser;
  }

  public async login({ password }: Login) {
    // This is what I would do if I had the time to set this up in a database
    // const user = await findUser({ email });

    // if (!user)
    //   throw new authErrorUserIsNotRegistered(
    //     "This email address is not registered."
    //   );

    const validatePassword = await new Auth().validPassword({
      password,
      hashedPassword: "",
    });

    if (!validatePassword) throw new Error("");

    const token = await generateJWT("");
    return {
      token,
      _id: "",
    };
  }
}
