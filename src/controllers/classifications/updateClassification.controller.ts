import { Request, Response } from "express";
import { IClassificationRequest } from "../../interfaces/classifications.interface";
import { updateClassificationService } from "../../services/classifications/updateClassification.service";

const updateClassificationController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { name }: IClassificationRequest = req.body;
  const updatedClassification = await updateClassificationService(id, name);
  return res.status(200).json(updatedClassification);
};

export default updateClassificationController;
