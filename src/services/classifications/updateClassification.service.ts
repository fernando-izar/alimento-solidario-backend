import AppDataSource from "../../data-source";
import { Classification } from "../../entities/classifications.entity";
import AppError from "../../errors/appError";

export const updateClassificationService = async (
  id: string,
  name: string
): Promise<Classification> => {
  const classificationRepository = AppDataSource.getRepository(Classification);

  const findClassification = await classificationRepository.findOneBy({
    id,
  });

  if (!findClassification) {
    throw new AppError("Classification not found!", 404);
  }

  await classificationRepository.update(id, { name });

  const classification = await classificationRepository.findOneBy({ id });

  return classification!;
};
