import AppDataSource from "../../data-source";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcrypt";
import AppError from "../../errors/appError";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";

const createUserService = async ({email, password, name, cnpj_cpf, address: addressRequest, responsible, contact, type, isAdm}: IUserRequest): Promise<User> => {
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
    console.log(addressRequest)
    const addressAlreadyExists = await addressesRepository.findOneBy({
        address: addressRequest.address,
        complement: addressRequest.complement,
        city: addressRequest.city,
        state: addressRequest.state,    
        zipCode: addressRequest.zipCode
        
    })

    if (addressAlreadyExists) {
        throw new AppError("address already exists!")
    }

    const newAddressObject = addressesRepository.create(
        addressRequest
    )
    
    const newAddress = await addressesRepository.save(newAddressObject);
    console.log(newAddressObject)

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