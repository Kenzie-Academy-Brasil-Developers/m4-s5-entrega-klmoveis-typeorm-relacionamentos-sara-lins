import { Router } from "express";
import {
  createPropertyController,
  readPropertyController,
} from "../../controllers/property/property.controller";
import authTokenMiddleware from "../../middleware/authToken.middleware";
import emailExistsMiddleware from "../../middleware/emailExists.middleware";
import isAdmMiddleware from "../../middleware/isAdm.middleware";
import isIdValidMiddleware from "../../middleware/isIdValid.middleware";

const routeProperty = Router();

routeProperty.post(
  "/",
  authTokenMiddleware,
  isAdmMiddleware,
  createPropertyController
);
routeProperty.get("/", readPropertyController);

export default routeProperty;
