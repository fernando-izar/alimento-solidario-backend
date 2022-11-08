
import AppDataSource from "../../data-source";
import { Reservation } from "../../entities/reservations.entity";
import { Donation } from "../../entities/donations.entity";
import IReservationRequest from "../../interfaces/reservations.interface";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appError";
import sendEmail from "../../nodemailer.util";

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
  const donationSender = await donationsRepository.find({
    where: {
      id: donationId
    },
    relations: {
      user: true
    }
  })
  //verificacoes
  if (!donation.available) {
    throw new AppError("This donation is not avaiable anymore");
  }

  await donationsRepository.update(donationId, { available: false });

  const newReservation = reservationsRepository.create({
    user,
    donation,
  });

  await reservationsRepository.save(newReservation);
  
  let subject = `Olá ${donationSender[0].user.name}`;
  let text = `
  <h4>Sua doação <strong> ${donation.quantity} de ${donation.food} </strong> foi reservada por ${user.responsible} e o seu contato é ${user.contact}.
  <br><br>
  O Alimento Solidário agradece mais uma vez sua doação!!!</h4>
  `;
  let to = `${donationSender[0].user.email}`;
  await sendEmail({subject, text, to});
  
  // subject = `Olá ${user.name}`
  // text = `Você reservou <strong>${donation.quantity} de ${donation.food}</strong> e a validade dessa mercadoria é ${donation.expiration}. O responsável pela doação é ${donationSender[0].user.responsible} e o seu contato é ${donationSender[0].user.contact}
  // <br>
  // <h6>E-mail automático. Favor não responder!</h6>` 
  // to = email
  // await sendEmail({subject, text, to});

  return newReservation;

};

export default createReservationService;