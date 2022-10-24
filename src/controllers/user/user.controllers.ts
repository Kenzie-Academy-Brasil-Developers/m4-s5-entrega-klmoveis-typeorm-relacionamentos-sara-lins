import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import {
  createUserService,
  deleteUserService,
  readUsersService,
  updateUserService,
} from "../../services/user/user.services";

import { instanceToPlain } from "class-transformer";

export const createUserController = async (req: Request, res: Response) => {
  const newUser = await createUserService(req.body);

  return res.status(201).json(instanceToPlain(newUser));
};

export const readUsersController = async (_: any, res: Response) => {
  const users = await readUsersService();

  return res.status(200).json(instanceToPlain(users));
};

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (req.user.isAdm) {
    const userUpdatedIsAdm = await updateUserService(req.body, id);
    return res.status(200).json(instanceToPlain(userUpdatedIsAdm));
  }

  if (req.user.id !== id) {
    throw new AppError(401, "User not admin not possible updated other user");
  }

  const userUpdated = await updateUserService(req.body, id);
  return res.status(200).json(instanceToPlain(userUpdated));
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteUserService(id);

  return res.status(204).send();
};
