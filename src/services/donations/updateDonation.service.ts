import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donations.entity";
import AppError from "../../errors/appError";
import { IDonationUpdate } from "../../interfaces/donations.interface";
const updateDonationService = async (
  id: string,
  updateDonationData: IDonationUpdate
): Promise<Donation> => {
  console.log("********************", updateDonationData);

  const donationsRepository = AppDataSource.getRepository(Donation);
  const donationFound = await donationsRepository.findOne({
    where: {
      id,
    },
  });

  if (!donationFound) {
    throw new AppError("Donation not found!");
  }

  await donationsRepository.update(donationFound.id, {
    food: updateDonationData.food
      ? updateDonationData.food
      : donationFound.food,
    quantity: updateDonationData.quantity
      ? updateDonationData.quantity
      : donationFound.quantity,
    available: updateDonationData.available,
  });

  const donationUpdated = await donationsRepository.findOne({
    where: {
      id,
    },
  });

  return donationUpdated!;
};

export default updateDonationService;
