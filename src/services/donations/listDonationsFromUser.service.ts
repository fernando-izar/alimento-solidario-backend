import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donations.entity";
import { User } from "../../entities/user.entity";

const listDonationsFromUserService = async (id: string) => {
  const donationRepository = AppDataSource.getRepository(Donation);
  const userRepository = AppDataSource.getRepository(User);
  const userDonor = await userRepository.find({
    where: { id },
    relations: { donations: true },
  });

  return userDonor;
};

export default listDonationsFromUserService;
