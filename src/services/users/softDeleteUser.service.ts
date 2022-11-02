import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appError";

const softDeleteUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const findUser = await userRepository.findOneBy({
        id
    })

    if (!findUser?.isActive) {
        throw new AppError("User not found!")
    }

    const softDeletedUSer = await userRepository.update(
        id,
        {
            isActive: false
        }
    );

    return "User deleted!"
}

export default softDeleteUserService;