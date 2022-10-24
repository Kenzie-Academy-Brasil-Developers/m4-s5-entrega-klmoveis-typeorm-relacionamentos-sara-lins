import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import loginService from "../../services/login/login.service";

const loginController = async (req: Request, res: Response) => {
  const dataLogin: IUserLogin = req.body;

  const token = await loginService(dataLogin);

  return res.status(200).json({ token });
};

export default loginController;
