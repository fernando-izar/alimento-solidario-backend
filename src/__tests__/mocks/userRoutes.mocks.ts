import { IUserLogin, IUserRequest } from "../../interfaces/users.interface";

export const userAdmDonorData: IUserRequest = {
  email: "teste@mail.com",
  password: "1234",
  name: "Robson",
  cnpj_cpf: "12345678900",
  responsible: "Carlos",
  contact: "1132320000",
  type: "Donor",
  isAdm: true,
  address: {
    address: "Rua das flores",
    complement: "32",
    city: "Sao Paulo",
    state: "SP",
    zipCode: "05210000",
  },
};

export const userLoginDonor: IUserRequest = {
  email: "teste13@mail.com",
  password: "1234",
  name: "Robson",
  cnpj_cpf: "12345678913",
  responsible: "Carlos",
  contact: "1132320000",
  type: "Donor",
  isAdm: true,
  address: {
    address: "Rua das rosas",
    complement: "32",
    city: "Sao Paulo",
    state: "SP",
    zipCode: "05210000",
  },
};

export const userLoginDonorSession: IUserLogin = {
  email: "teste13@mail.com",
  password: "1234",
};

export const userAdmCharityData: IUserRequest = {
  email: "teste2@mail.com",
  password: "1234",
  name: "Carlos",
  cnpj_cpf: "12345678901",
  address: {
    address: "Rua das canas",
    complement: "33",
    city: "Sao Paulo",
    state: "SP",
    zipCode: "05210001",
  },
  responsible: "Robson",
  contact: "1132320001",
  type: "Charity",
  isAdm: true,
};

export const userAdmCharityDataSession: IUserLogin = {
  email: "teste2@mail.com",
  password: "1234",
};

export const userTestDonorData: IUserRequest = {
  email: "teste15@mail.com",
  password: "1234",
  name: "Carlos",
  cnpj_cpf: "12312312300",
  address: {
    address: "Rua 225",
    complement: "99",
    city: "Sao Paulo",
    state: "SP",
    zipCode: "05210005",
  },
  responsible: "Robson",
  contact: "1132320001",
  type: "Donor",
  isAdm: true,
};

export const userNotAdmDonorData: IUserRequest = {
  email: "teste3@mail.com",
  password: "1234",
  name: "Gilson",
  cnpj_cpf: "12345678902",
  responsible: "Junior",
  contact: "1132320002",
  type: "Donor",
  isAdm: false,
  address: {
    address: "Rua das rosas",
    complement: "34",
    city: "Sao Paulo",
    state: "SP",
    zipCode: "05210002",
  },
};

export const userNotAdmCharityData: IUserRequest = {
  email: "teste4@mail.com",
  password: "1234",
  name: "Junior",
  cnpj_cpf: "12345678903",
  responsible: "Gilson",
  contact: "1132320003",
  type: "Charity",
  isAdm: false,
  address: {
    address: "Rua das aguas",
    complement: "35",
    city: "Sao Paulo",
    state: "SP",
    zipCode: "05210003",
  },
};

export const userNotAdmDonorDataLogin: IUserLogin = {
  email: "teste3@mail.com",
  password: "1234",
};

export const userAdmDonorDataLogin: IUserLogin = {
  email: "teste@mail.com",
  password: "1234",
};

export const userTestDonorDataLogin: IUserLogin = {
  email: "teste15@mail.com",
  password: "1234",
};
