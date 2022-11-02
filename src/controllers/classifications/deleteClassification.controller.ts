import { Request, Response } from "express";
import { IClassificationRequest } from "../../interfaces/classifications.interface";
import { deleteClassificationService } from "../../services/classifications/deleteClassification.service";

const deleteClassificationController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const message = await deleteClassificationService(id);
  return res.status(204).json({ message });
};

export default deleteClassificationController;
