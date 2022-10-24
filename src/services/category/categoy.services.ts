import { hash } from "bcrypt";
import { Categories } from "../../entities/categories.entity";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserRequest, IUserUpdate } from "../../interfaces/users";
import { ICategoryRequest } from "../../interfaces/categories";
import {
  createUserSerializer,
  updateUserSerializer,
} from "../../serializers/users.serializers";
import { categorySerializer } from "../../serializers/category.serializer";

export const createCategoryService = async (
  dataClientCategory: ICategoryRequest
) => {
  const serializedCategory = await categorySerializer.validate(
    dataClientCategory,
    {
      stripUnknown: true,
      abortEarly: true,
    }
  );

  const categoryRepository = AppDataSource.getRepository(Categories);

  const categoryFind = await categoryRepository.findOneBy({
    name: dataClientCategory.name,
  });

  if (categoryFind) {
    throw new AppError(400, "Category name already exists");
  }

  const category = categoryRepository.create({
    ...serializedCategory,
  });

  await categoryRepository.save(category);

  return category;
};

export const readCategoriesService = async () => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const categories = await categoryRepository.find();

  return categories;
};

export const readCategoriesPropertiesService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const categories = await categoryRepository.findOne({
    where: {
      id,
    },
    relations: {
      properties: true,
    },
  });

  if (!categories) {
    throw new AppError(404, "Category not found");
  }

  return categories;
};
