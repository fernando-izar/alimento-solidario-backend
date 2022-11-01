import AppDataSource from "../../data-source";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcrypt";
import AppError from "../../errors/appError";
import { User } from "../../entities/user.entity";

const createUserService = async ({
  email,
  password,
  name,
  cnpj_cpf,
  responsible,
  contact,
  type,
  isAdm,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError("E-mail already exists!");
  }

  if (!password) {
    throw new AppError("Password is missing!");
  }

  const hashedPassword = await hash(password, 10);
  const user = userRepository.create({
    email,
    password: hashedPassword,
    name,
    cnpj_cpf,
    responsible,
    contact,
    type,
    isAdm,
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;
