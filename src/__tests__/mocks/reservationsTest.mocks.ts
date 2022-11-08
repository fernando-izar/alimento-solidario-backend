import { IUserLogin, IUserRequest } from "../../interfaces/users.interface";

export const mockedAdminDonor: IUserRequest = {
  email: "charity@mail.com",
  password: "1234",
  name: "charity",
  cnpj_cpf: "22222222222222",
  address: {
    address: "rua n",
    complement: "apto 23",
    city: "São Paulo",
    state: "SP",
    zipCode: "11333000",
  },
  responsible: "João",
  contact: "Ana",
  type: "donor",
  isAdm: true,
};

export const mockedUserCharity: IUserRequest = {
  email: "kenzinho@mail.com",
  password: "123456",
  name: "kenzinho",
  cnpj_cpf: "11111111111",
  address: {
    address: "rua qualquer",
    complement: "apto 99",
    city: "Porto Alegre",
    state: "RS",
    zipCode: "11222000",
  },
  responsible: "José",
  contact: "Maria",
  type: "charity",
  isAdm: false,
};

export const mockedUserCharity2: IUserRequest = {
  email: "charity@mail.com",
  password: "12345",
  name: "charity",
  cnpj_cpf: "22222222222",
  address: {
    address: "rua um",
    complement: "apto 989",
    city: "Aleluia",
    state: "RS",
    zipCode: "12345665",
  },
  responsible: "José",
  contact: "Maria",
  type: "charity",
  isAdm: false,
};

export const mockedAdminDonorLogin: IUserLogin = {
  email: "charity@mail.com",
  password: "1234",
};

export const mockedUserCharityLogin: IUserLogin = {
  email: "kenzinho@mail.com",
  password: "123456",
};

export const mockedUserCharityLogin2: IUserLogin = {
  email: "charity@mail.com",
  password: "12345",
};

export const mockedDonationInfoToDelete = {
  food: "comida de pato",
  quantity: "10 sacos grandes",
  expiration: "30/11/2022",
};

export const mockedDonationInfoToCreate = {
  food: "pele de jacaré",
  quantity: "2 baldes",
  expiration: "30/11/2022",
};
