import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/users";
import { IAddressUpdate } from "../../interfaces/addresses";
import { hash } from "bcrypt";
import AppError from "../../errors/appError";
import { compileFunction } from "vm";
import { Address } from "../../entities/address.entity";

const updateUSerService = async ({email, password, name, cnpj_cpf, responsible, contact, address: addressRequest}: IUserUpdate, id: string): Promise<User> => {
    console.log(email, password, name, cnpj_cpf, responsible, contact)
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
        throw new AppError("User not found!", 404)
    }
    console.log(findUser.address.address)
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

    console.log(newAddress, email)
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
        console.log("Ola")
    const updatedUser = await userRepository.findOneBy({
        id
    })

    return updatedUser!;
}

export default updateUSerService;
