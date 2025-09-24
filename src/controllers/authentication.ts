import { type Request, type Response } from "express";
import { getUserByEmail, createUser } from "../db/users";
import { authentication, random } from "../helpers";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    // check for incomplete data
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    // checks if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    // create user and hash the password
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
