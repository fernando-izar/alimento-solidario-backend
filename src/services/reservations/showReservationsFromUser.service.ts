//import data, reservations

const showReservationsService = async (): Promise<Reservations[]> => {
  //const reservationsRepository = AppDataSource.getRepository(Reservations);
  const reservations = await reservationsRepository.find();

  return reservations;
};

export default showReservationsService;
