import AppDataSource from "../../data-source";
import { Reservation } from "../../entities/reservations.entity";
import { User } from "../../entities/user.entity";

const showReservationsService = async (
  userId: string
): Promise<Reservation[]> => {
  const reservationsRepository = AppDataSource.getRepository(Reservation);
  const usersRepository = AppDataSource.getRepository(User);

  const user = await usersRepository.findOneBy({
    id: userId,
  });

  const reservations = await reservationsRepository.find({
    where: {
      user: {
        id: user?.id,
      },
    },
    relations: {
      donation: {
        user: true,
      },
      user: true,
    },
  });

  return reservations;
};

export default showReservationsService;
