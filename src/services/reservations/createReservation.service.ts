import AppDataSource from "../../data-source";
import { Reservation } from "../../entities/reservations.entity";
import { Donation } from "../../entities/donations.entity";
import IReservationRequest from "../../interfaces/reservations";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appError";

const createReservationService = async ({
  donationId,
}: IReservationRequest) => {
  const reservationsRepository = AppDataSource.getRepository(Reservation);
  const donationsRepository = AppDataSource.getRepository(Donation);
  const userRepository = AppDataSource.getRepository(User);

  //encontrar usuário através da req.user(?)
  //const userId = await userRepository.findOneBy({ id: user });
  const donation = await donationsRepository.findOneBy({ id: donationId });
  //const newReservation = reservationsRepository.create({ donation });

  //verificacoes
  if (!donation?.available) {
    throw new AppError("This donation is not avaiable anymore.");
  }
  //data

  //await reservationsRepository.save(newReservation);
  //return newReservation;
};

export default createReservationService;
