import { compareSync, genSaltSync, hashSync } from "bcrypt";

export const bcryptAdapter = {
  hash: (password: string) => {
    const salt = genSaltSync(15);
    return hashSync(password, salt);
  },
  compare: (password: string, hashed: string) => {
    return compareSync(password, hashed);
  },
};
