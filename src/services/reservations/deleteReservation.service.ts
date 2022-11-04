import AppDataSource from "../../data-source";
import { Reservation } from "../../entities/reservations.entity";
import AppError from "../../errors/appError";

const deleteReservationService = async (id: string, userId: string): Promise<void> => {
  const reservationRepository = AppDataSource.getRepository(Reservation)

  const reservation = await reservationRepository.findOneBy({
    id: id
  })  

  if (!reservation) {
    throw new AppError("Reservation not found", 404);
  }

  if (reservation.user.id === userId){
    await reservationRepository.delete({
      id: reservation.id
    })

    return 
  }

  throw new AppError("You can't delete donation from another user", 403)
};

export default deleteReservationService;
