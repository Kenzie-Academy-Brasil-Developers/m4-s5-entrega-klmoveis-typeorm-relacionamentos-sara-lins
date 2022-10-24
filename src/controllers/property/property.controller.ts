import { Request, Response } from "express";
import {
  createPropertyService,
  readPropertyService,
} from "../../services/property/property.services";

export const createPropertyController = async (req: Request, res: Response) => {
  const newProperty = await createPropertyService(req.body);

  return res.status(201).json(newProperty);
};

export const readPropertyController = async (_: any, res: Response) => {
  const properties = await readPropertyService();

  return res.status(200).json(properties);
};
