import { IClassificationRequest } from "../../interfaces/classifications.interface";
import { IUserRequest } from "../../interfaces/users.interface";

export const mockedClassification1: IClassificationRequest = {
  name: "Hortifruti",
};

export const mockedClassification2: IClassificationRequest = {
  name: "Enlatados",
};

export const mockedClassification3: IClassificationRequest = {
  name: "Biscoitos",
};

export const mockedClassification4: IClassificationRequest = {
  name: "Salsichas",
};

export const mockedClassification5: IClassificationRequest = {
  name: "Salsichas temperadas",
};

export const mockedAdmin: IUserRequest = {
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
  type: "charity",
  isAdm: true,
};

export const mockedUser: IUserRequest = {
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
  type: "donor",
  isAdm: false,
};

export const mockedAdminLogin = {
  email: "charity@mail.com",
  password: "1234",
};

export const mockedUserLogin = {
  email: "kenzinho@mail.com",
  password: "123456",
};

export const mockedAdminLoginWrongPassword = {
  email: "charity@mail.com",
  password: "1254",
};
