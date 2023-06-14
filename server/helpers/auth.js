import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw new Error("An Error occurred during password hashing ");
  }
};

export const comparePassword = async (password, hashed) => {
  try {
    const isMatch = await bcrypt.compare(password, hashed);
    return isMatch;
  } catch (error) {
    console.log(error);
    throw new Error("An Error occurred during password checking ");
  }
};
