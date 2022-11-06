import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appError";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { IUserLogin } from "../../interfaces/users.interface";

const loginUserService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("Wrong e-mail/password!", 403);
  }

  const passwordMatched = compareSync(password, user.password);

  if (!passwordMatched) {
    throw new AppError("Wrong e-mail/password!", 403);
  }

  const token = jwt.sign(
    { isAdm: user.isAdm, type: user.type },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );
  return { user, token };
};

export default loginUserService;
