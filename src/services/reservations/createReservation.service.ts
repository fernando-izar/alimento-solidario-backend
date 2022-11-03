//import appdataSource, entidade Reservations, interface de request
import IReservationRequest from "../../interfaces/reservations";

const createReservationService = async ({
  donationId,
}: IReservationRequest) => {
  //const userRepository
  // const reservationsRepository
  // const donation
  //
  //checagem de tipo de usuario tentando fazer a reserva é feita por middleware
  //
  //if (!reservation.available){
  //retornar AppError("This donation is already gone", 404)
  //}
  //
  //checagem de data
  //

  const newReservation = reservationsRepository.create({
    donation: donation,
    //sugestão: nome do donatário e doador
  });

  await reservationsRepository.save(newReservation);
  return newReservation;
};

export default createReservationService;
