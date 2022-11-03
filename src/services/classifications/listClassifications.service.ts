import AppDataSource from "../../data-source";
import { Classification } from "../../entities/classifications.entity";

export const listClassificationsService = async (): Promise<
  Classification[]
> => {
  const classificationRepository = AppDataSource.getRepository(Classification);

  const classifications = await classificationRepository.find();

  return classifications;
};
