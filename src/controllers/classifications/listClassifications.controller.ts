import { Request, Response } from "express";
import { listClassificationsService } from "../../services/classifications/listClassifications.service";

export const listClassificationsController = async (
  req: Request,
  res: Response
) => {
  const classifications = await listClassificationsService();

  return res.status(200).json(classifications);
};
