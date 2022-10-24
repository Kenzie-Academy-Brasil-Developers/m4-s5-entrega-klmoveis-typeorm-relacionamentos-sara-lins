import { Router } from "express";
import {
  createCategoryController,
  readAllCategoriesController,
  readCategoryPropertiesController,
} from "../../controllers/category/category.controller";
import authTokenMiddleware from "../../middleware/authToken.middleware";
import emailExistsMiddleware from "../../middleware/emailExists.middleware";
import isAdmMiddleware from "../../middleware/isAdm.middleware";
import isIdValidMiddleware from "../../middleware/isIdValid.middleware";

const routeCategory = Router();

routeCategory.post(
  "/",
  authTokenMiddleware,
  isAdmMiddleware,
  createCategoryController
);
routeCategory.get("/", readAllCategoriesController);
routeCategory.get("/:id/properties", readCategoryPropertiesController);

export default routeCategory;
