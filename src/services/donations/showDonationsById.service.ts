import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donations.entity";
import AppError from "../../errors/appError";

const showDonationsByIdService = async (id: string): Promise<Donation> => {
  const donationsRepository = AppDataSource.getRepository(Donation);
  const donationFound = await donationsRepository.findOne({
    where: {
      id,
    },
  });

  if (!donationFound) {
    throw new AppError("Donation not found!");
  }

  return donationFound;
};

export default showDonationsByIdService;