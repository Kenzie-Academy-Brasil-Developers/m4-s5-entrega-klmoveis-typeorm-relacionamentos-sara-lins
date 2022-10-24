import { compare } from "bcrypt";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { loginUserSerializer } from "../../serializers/users.serializers";
import { AppError } from "../../errors/appError";

const loginService = async (dataLogin: IUserLogin): Promise<string> => {
  const user = await loginUserSerializer.validate(dataLogin, {
    stripUnknown: true,
    abortEarly: true,
  });

  const { email, password } = user;

  const userRepository = AppDataSource.getRepository(User);

  const userFind = await userRepository.findOneBy({
    email: email,
  });

  if (!userFind) {
    throw new AppError(403, "Invalid User or Password");
  }

  const passwordMatched = await compare(password, userFind.password);

  if (!passwordMatched) {
    throw new AppError(403, "Invalid User or Password");
  }

  const token = jwt.sign(
    {
      isAdm: userFind.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: userFind.id,
    }
  );

  return token;
};

export default loginService;
