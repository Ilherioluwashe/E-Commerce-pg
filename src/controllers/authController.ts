import { User } from "../entity/user";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import { Request, Response } from "express";
import { validate } from "class-validator";
import bcrypt from "bcrypt";
import { attachCookiesToResponse, createTokenUser } from "../utils";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const emailAlreadyExist = await User.findOneBy({ email });
  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const isFirstAccount = (await User.count({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  try {
    const user = User.create({ name, email, password, role });
    const errors = await validate(user);
    if (errors.length > 0) throw errors;
    await user.save();

    const tokenUser = { name: user.name, userUuid: user.uuid, role: user.role };
    attachCookiesToResponse({ res, user: tokenUser });
    return res.status(StatusCodes.CREATED).json({ user: tokenUser });
  } catch (err) {
    console.log(err);
    throw new CustomError.BadRequestError("Please enter a valid email");
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOneBy({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};

export { register, login, logout };
