import AppDataSource from "../../data-source";
import { Classification } from "../../entities/classifications.entity";
import AppError from "../../errors/appError";

export const createClassificationService = async (
  name: string
): Promise<Classification> => {
  const classificationRepository = AppDataSource.getRepository(Classification);

  const classificationAlreadyExists = await classificationRepository.findOneBy({
    name,
  });

  if (classificationAlreadyExists) {
    throw new AppError("Classification already exists!");
  }

  const newClassification = classificationRepository.create({ name });

  await classificationRepository.save(newClassification);

  return newClassification;
};
