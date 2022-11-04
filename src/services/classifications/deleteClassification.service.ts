import AppDataSource from "../../data-source";
import { Classification } from "../../entities/classifications.entity";
import AppError from "../../errors/appError";

export const deleteClassificationService = async (
  id: string
): Promise<string> => {
  const classificationRepository = AppDataSource.getRepository(Classification);

  const findClassification = await classificationRepository.findOneBy({
    id,
  });

  if (!findClassification) {
    throw new AppError("Classification not found!", 404);
  }

  await classificationRepository.delete(id);

  return "Classification deleted with success";
};
