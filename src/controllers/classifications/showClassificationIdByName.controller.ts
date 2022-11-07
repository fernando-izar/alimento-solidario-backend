import { Request, Response } from "express";
import { showClassificationIdByNameService } from "../../services/classifications/showClassificationIdByName.service";
import { IClassificationRequest } from "../../interfaces/classifications.interface";

export const showClassificationIdByNameController = async (
  req: Request,
  res: Response
) => {
  const name: string = req.params.name;

  const classifications = await showClassificationIdByNameService(name);

  return res.status(200).json(classifications);
};
