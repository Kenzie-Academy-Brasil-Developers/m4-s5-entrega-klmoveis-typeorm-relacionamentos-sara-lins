import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserRequest, IUserUpdate } from "../../interfaces/users";
import {
  createUserSerializer,
  updateUserSerializer,
} from "../../serializers/users.serializers";

export const createUserService = async (dataClientUser: IUserRequest) => {
  const serializedUser = await createUserSerializer.validate(dataClientUser, {
    stripUnknown: true,
    abortEarly: true,
  });

  const userRepository = AppDataSource.getRepository(User);

  const user = userRepository.create({
    ...serializedUser,
  });

  await userRepository.save(user);

  return user;
};

export const readUsersService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users;
};

export const updateUserService = async (
  dataUser: IUserUpdate,
  idReq: string
) => {
  const userUpdated = await updateUserSerializer.validate(dataUser, {
    stripUnknown: true,
    abortEarly: true,
  });

  const { id, isAdm, isActive, createdAt, name, email, password }: any =
    dataUser;

  if (
    id !== undefined ||
    isAdm !== undefined ||
    isActive !== undefined ||
    createdAt !== undefined
  ) {
    throw new AppError(401, "Just possible update: name, email and password.");
  }

  const userRepository = AppDataSource.getRepository(User);

  const userFind = await userRepository.findOneBy({
    id: idReq,
  });

  if (!userFind) {
    throw new AppError(404, "User not found");
  }

  if (userUpdated) {
    await userRepository.update(idReq, {
      name: name ? userUpdated.name : userFind.name,
      email: email ? userUpdated.email : userFind.email,
      password: password ? userUpdated.password : userFind.password,
      updatedAt: new Date(),
    });
  }

  const user = await userRepository.findOneBy({
    id: idReq,
  });

  return user;
};

export const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  let user = await userRepository.findOneBy({
    id,
  });

  if (!user!.isActive) {
    throw new AppError(400, "User not active");
  }

  await userRepository.update(id, {
    isActive: false,
  });

  return true;
};
