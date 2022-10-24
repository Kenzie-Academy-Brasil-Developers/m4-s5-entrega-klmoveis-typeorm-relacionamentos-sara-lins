import { Router } from "express";
import {
  createScheduleController,
  readScheduleController,
} from "../../controllers/schedule/schedule.controller";
import authTokenMiddleware from "../../middleware/authToken.middleware";
import isAdmMiddleware from "../../middleware/isAdm.middleware";

const routeSchedule = Router();

routeSchedule.post("", authTokenMiddleware, createScheduleController);
routeSchedule.get(
  "/properties/:id",
  authTokenMiddleware,
  isAdmMiddleware,
  readScheduleController
);

export default routeSchedule;
