import AppDataSource from "../../data-source";
import { Classification } from "../../entities/classifications.entity";
import AppError from "../../errors/appError";

export const showClassificationIdByNameService = async (
  name: string
): Promise<Classification> => {
  const classificationRepository = AppDataSource.getRepository(Classification);

  console.log(name);
  const classification = await classificationRepository.findOneBy({ name });

  if (!classification) {
    throw new AppError("Classification not found", 403);
  }

  return classification;
};
