import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donations.entity";
import { IDonationRequest } from "../../interfaces/donations.interface";
import AppError from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { Classification } from "../../entities/classifications.entity";
import sendEmail from "../../nodemailer.util";

const createDonationService = async (
  { food, quantity, expiration, classificationId }: IDonationRequest,
  user: any
) => {
  const donationRepository = AppDataSource.getRepository(Donation);
  const userRepository = AppDataSource.getRepository(User);
  const classificationRepository = AppDataSource.getRepository(Classification);

  const classificationOfDonation = await classificationRepository.findOneBy({
    id: classificationId,
  });

  const donator = await userRepository.findOneBy({ id: user.id });

  if (!classificationOfDonation) {
    throw new AppError("Invalid Classification ID", 404);
  }

  if (!donator) {
    throw new AppError("Invalid Donator ID", 404);
  }

  const newDonationObject = {
    food,
    quantity,
    expiration,
    classification: classificationOfDonation,
    user: donator,
  };

  const finalDonation = await donationRepository.save(newDonationObject);

  let subject = `Olá ${finalDonation.user.name}`;
  let text = `
  Sua doação <strong> ${finalDonation.quantity} de ${finalDonation.food} </strong> acaba de ser colocada à disposição daqueles que mais precisam.
  <br><br>
  O Alimento Solidário agradece sua doação!!!
  <br>
  <h6>E-mail automático. Favor não responder</h6>
  `;
  let to = `${finalDonation.user.email}`;
  await sendEmail({subject, text, to});

  return finalDonation;
};

export default createDonationService;
