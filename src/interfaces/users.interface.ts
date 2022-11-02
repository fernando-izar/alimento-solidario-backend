import { IAddressRequest } from "./addresses.interface";

export interface IUserRequest {
  email: string;
  password?: string;
  name: string;
  cnpj_cpf: string;
  responsible: string;
  contact: string;
  type: string;
  isAdm: boolean;
  address: IAddressRequest;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  email?: string;
  password?: string;
  name?: string;
  cnpj_cpf?: string;
  responsible?: string;
  contact?: string;
}
