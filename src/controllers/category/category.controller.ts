import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import {
  createCategoryService,
  readCategoriesPropertiesService,
  readCategoriesService,
} from "../../services/category/categoy.services";
import {
  createPropertyService,
  readPropertyService,
} from "../../services/property/property.services";
import {
  createUserService,
  deleteUserService,
  readUsersService,
  updateUserService,
} from "../../services/user/user.services";

export const createCategoryController = async (req: Request, res: Response) => {
  const newCategory = await createCategoryService(req.body);

  return res.status(201).json(newCategory);
};

export const readAllCategoriesController = async (
  _: Request,
  res: Response
) => {
  const categories = await readCategoriesService();
  return res.status(200).json(categories);
};

export const readCategoryPropertiesController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const property = await readCategoriesPropertiesService(id);

  return res.status(200).json(property);
};
