import AppDataSource from "../../data-source";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcrypt";
import AppError from "../../errors/appError";
import { User } from "../../entities/users/user.entity";
import { Address } from "../../entities/addresses/address.entity";
import { IAddressRequest } from "../../interfaces/addresses";
const createUserService = async ({email, password, name, cnpj_cpf, responsible, contact, type, isAdm, address}: IUserRequest): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const addressesRepository = AppDataSource.getRepository(Address);

    const users = await userRepository.find();

    const emailAlreadyExists = users.find(user => user.email === email);

    if (emailAlreadyExists) {
        throw new AppError("E-mail already exists!")
    }

    if (!password) {
        throw new AppError("Password is missing!")
    }

    const addressAlreadyExists = await addressesRepository.findOne({
        where:{
            address: address.address
        }
    })

    if (addressAlreadyExists) {
        throw new AppError("address already exists!")
    }

    const newAddressObject: IAddressRequest = {
        address: address.address,
        complement: address.complement,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode
    }

    const newAddress = await addressesRepository.save(newAddressObject);

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
        address: newAddress
    })

    await userRepository.save(user);

    return user;
}

export default createUserService;