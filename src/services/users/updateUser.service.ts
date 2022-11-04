import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";
import AppError from "../../errors/appError";
import { Address } from "../../entities/address.entity";
import { IUserUpdate } from "../../interfaces/users.interface";

const updateUSerService = async ({email, password, name, cnpj_cpf, responsible, contact, address: addressRequest}: IUserUpdate, id: string): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const addressRepository = AppDataSource.getRepository(Address);

    const findUser = await userRepository.findOne({
        where: {
            id
        }, 
        relations: {
            address: true
        }
    })

    if(!findUser) {
        throw new AppError("Invalid id!", 404)
    }

    const newAddressObject = {
        address: addressRequest?.address ? addressRequest.address : findUser.address.address,
        complement: addressRequest?.complement ? addressRequest.complement : findUser.address.complement,
        city: addressRequest?.city ? addressRequest.city : findUser.address.city,
        state: addressRequest?.state ? addressRequest.state : findUser.address.state,
        zipCode: addressRequest?.zipCode ? addressRequest.zipCode : findUser.address.zipCode
    }

    const newAddress = addressRepository.create(newAddressObject);

    const findAddress = await addressRepository.findOneBy({
        id: newAddress.id,
    })

    await userRepository.update(
        id,
        {
            email: email ? email : findUser.email,
            password: password ? await hash(password, 10) : findUser.password,
            name: name ? name : findUser.name,
            cnpj_cpf: cnpj_cpf ? cnpj_cpf : findUser.cnpj_cpf,
            responsible: responsible ? responsible : findUser.responsible,
            contact: contact ? contact : findUser.contact,
        }
    )

    await addressRepository.update(
        findAddress!.id, newAddressObject
    )

    const updatedUser = await userRepository.findOneBy({
        id
    })

    return updatedUser!;
}

export default updateUSerService;