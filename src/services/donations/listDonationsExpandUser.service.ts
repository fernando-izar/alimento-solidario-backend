import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donations.entity";

const listDonationsExpandUserService = async (): Promise<Donation[]> => {
  const donationRepository = AppDataSource.getRepository(Donation);
  const donations = await donationRepository.find({
    relations: { user: true, classification: true },
  });

  return donations;
};

export default listDonationsExpandUserService;
