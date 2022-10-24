import { Request, Response } from "express";
import {
  createScheduleService,
  readSheduleService,
} from "../../services/schedule/schedule.service";

export const createScheduleController = async (req: Request, res: Response) => {
  const { id } = req.user;
  await createScheduleService(req.body, id);

  return res.status(201).json({
    message: "Created schedule",
  });
};

export const readScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedules = await readSheduleService(id);

  return res.status(200).json(schedules);
};
