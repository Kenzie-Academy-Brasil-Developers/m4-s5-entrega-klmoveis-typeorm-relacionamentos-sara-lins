import { Router } from "express";
import loginController from "../../controllers/login/login.controller";

const routeLogin = Router();

routeLogin.post("/", loginController);

export default routeLogin;
