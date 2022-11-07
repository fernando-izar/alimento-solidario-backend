import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donations.entity";
import { IDonationRequest } from "../../interfaces/donations.interface";
import AppError from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { Classification } from "../../entities/classifications.entity";

const createDonationService = async (
  { food, quantity, expiration, classification }: IDonationRequest,
  user: any
) => {
  const donationRepository = AppDataSource.getRepository(Donation);
  const userRepository = AppDataSource.getRepository(User);
  const classificationRepository = AppDataSource.getRepository(Classification);

  const classificationOfDonation = await classificationRepository.findOneBy({
    id: classification,
  });

  const donator = await userRepository.findOneBy({ id: user.id });

  if (!classificationOfDonation) {
    throw new AppError("Invalid Classification ID", 404);
  }

  if (!donator) {
    throw new AppError("Invalid Donator ID", 404);
  }

  const newDonationObject = {
    food,
    quantity,
    expiration,
    classification: classificationOfDonation,
    user: donator,
  };

  const finalDonation = await donationRepository.save(newDonationObject);

  return finalDonation;
};

export default createDonationService;
