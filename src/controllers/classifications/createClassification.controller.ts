import { Request, Response } from "express";
import { IClassificationRequest } from "../../interfaces/classifications.interface";
import { createClassificationService } from "../../services/classifications/createClassification.service";

const createClassificationController = async (req: Request, res: Response) => {
  const { name }: IClassificationRequest = req.body;
  const createdClassification = await createClassificationService(name);
  return res.status(201).json(createdClassification);
};

export default createClassificationController;
