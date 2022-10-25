import { User } from "../entity/user";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
  //   console.log(req.user);
  const users = await User.createQueryBuilder("user")
    .select([
      "user.uuid",
      "user.createdAt",
      "user.updatedAt",
      "user.name",
      "user.email",
      "user.role",
    ])
    .where("user.role = :role", { role: "user" })
    .getMany();
  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req: Request, res: Response) => {
  res.send("get single user");
};
const showCurrentUser = async (req: Request, res: Response) => {
  res.send("show current user");
};
const updateUser = async (req: Request, res: Response) => {
  res.send("update user");
};
const updateUserPassword = async (req: Request, res: Response) => {
  res.send("update password");
};

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
