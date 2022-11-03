import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donations.entity";
import AppError from "../../errors/appError";

const showDonationsByIdExpandUserService = async (id: string): Promise<Donation> => {
  const donationsRepository = AppDataSource.getRepository(Donation);
  const donationFoundExpandUser = await donationsRepository.findOne({
    where: {
      id,
    },
    relations: {
      user: true,
    }
  });

  if (!donationFoundExpandUser) {
    throw new AppError("Donation not found!");
  }

  return donationFoundExpandUser;
};

export default showDonationsByIdExpandUserService;