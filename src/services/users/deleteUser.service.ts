import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appError";

const deleteUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const addressRepository = AppDataSource.getRepository(Address);
    const findUser = await userRepository.findOneBy({
        id
    })

    if(!findUser) {
        throw new AppError("Invalid id!", 404)
    }
    
    const addressId = findUser?.address.id

    if (!findUser) {
        throw new AppError("Invalid id!")
    }

    await userRepository.remove(findUser);
    await addressRepository.delete(addressId!);

    return "User deleted with success!"
}

export default deleteUserService;