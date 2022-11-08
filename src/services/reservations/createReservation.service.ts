import AppDataSource from "../../data-source";
import { Reservation } from "../../entities/reservations.entity";
import { Donation } from "../../entities/donations.entity";
import IReservationRequest from "../../interfaces/reservations.interface";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appError";

const createReservationService = async (
  { donationId }: IReservationRequest,
  userId: string
): Promise<Reservation> => {
  const reservationsRepository = AppDataSource.getRepository(Reservation);
  const donationsRepository = AppDataSource.getRepository(Donation);
  const userRepository = AppDataSource.getRepository(User);

  //encontrar usuário através da req.user(?)
  const user = await userRepository.findOneBy({ id: userId });
  const donation = await donationsRepository.findOneBy({ id: donationId });

  if (!user) throw new AppError("User ID not found", 404);
  if (!donation) throw new AppError("Donation ID not found", 404);
  //const newReservation = reservationsRepository.create({ donation });

  //verificacoes
  if (!donation.available) {
    throw new AppError("This donation is not avaiable anymore", 403);
  }

  await donationsRepository.update(donationId, { available: false });

  const newReservation = reservationsRepository.create({
    user,
    donation,
  });

  await reservationsRepository.save(newReservation);

  return newReservation;
};

export default createReservationService;
