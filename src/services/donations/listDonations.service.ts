import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donations.entity";

const listDonationsService = async (): Promise<Donation[]> => {
  const donationRepository = AppDataSource.getRepository(Donation);
  const donations = await donationRepository.find();

  return donations;
};

export default listDonationsService;
