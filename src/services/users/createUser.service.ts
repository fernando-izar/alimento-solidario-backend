import AppDataSource from "../../data-source";
import { hash } from "bcrypt";
import AppError from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { IUserRequest } from "../../interfaces/users.interface";

const createUserService = async ({email, password, name, cnpj_cpf, address: addressRequest, responsible, contact, type, isAdm}: IUserRequest): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const addressesRepository = AppDataSource.getRepository(Address);

    const users = await userRepository.find();

    const emailAlreadyExists = users.find(user => user.email === email);

    if (emailAlreadyExists) {
        throw new AppError("User already exists!")
    }

    const cnpjCpfAlreadyExists = users.find(user => user.cnpj_cpf === cnpj_cpf);

    if (cnpjCpfAlreadyExists) {
        throw new AppError("CNPJ/CPF already exists!")
    }

    if (!password) {
        throw new AppError("Password is missing!")
    }
    const addressAlreadyExists = await addressesRepository.findOneBy({
        address: addressRequest.address,
        complement: addressRequest.complement,
    })

    if (addressAlreadyExists) {
        throw new AppError("address already exists!")
    }

    const newAddressObject = addressesRepository.create(
        addressRequest
    )
    
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
