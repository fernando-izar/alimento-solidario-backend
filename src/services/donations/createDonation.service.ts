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

  if (!food || !quantity || !expiration || !classification) {
    throw new AppError("Incomplete information", 403);
  }

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  const expirationDay = expiration.slice(0, 2);
  const expirationMonth = expiration.slice(3, 5);
  const expirationYear = expiration.slice(6, 10);

  const expirationDate = new Date(
    `${expirationMonth}/${expirationDay}/${expirationYear}`
  );

  const todayFullDate = new Date(`${todayMonth + 1}/${todayDay}/${todayYear}`);

  if (todayFullDate > expirationDate) {
    throw new AppError(
      "Should not be able to create donation with invalid expiration (date before current date)",
      403
    );
  }

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
