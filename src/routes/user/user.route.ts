import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  readUsersController,
  updateUserController,
} from "../../controllers/user/user.controllers";
import authTokenMiddleware from "../../middleware/authToken.middleware";
import emailExistsMiddleware from "../../middleware/emailExists.middleware";
import isAdmMiddleware from "../../middleware/isAdm.middleware";
import isIdValidMiddleware from "../../middleware/isIdValid.middleware";

const routeUser = Router();

routeUser.post("/", emailExistsMiddleware, createUserController);
routeUser.get("/", authTokenMiddleware, isAdmMiddleware, readUsersController);
routeUser.patch("/:id", authTokenMiddleware, updateUserController);
routeUser.delete(
  "/:id",
  authTokenMiddleware,
  isAdmMiddleware,
  isIdValidMiddleware,
  deleteUserController
);

export default routeUser;
