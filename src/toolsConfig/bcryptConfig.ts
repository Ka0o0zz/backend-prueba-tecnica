import { genSalt, hash, compare } from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await genSalt(saltRounds);
    const hashPassword = await hash(password, salt);
    return hashPassword;
  } catch (error) {
    throw new Error("Password encryption error");
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error when comparing passwords");
  }
};
