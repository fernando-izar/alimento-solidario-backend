import {
  IDonationRequest,
  IDonationUpdate,
} from "../../interfaces/donations.interface";

export const donationMock: IDonationRequest = {
  food: "Salsicha enlatada",
  quantity: "12",
  expiration: "25/12/2022",
  classification: "62da0947-4c5a-46c6-8b4d-2cd4df7d4c89",
};

export const updateDonationMock: IDonationUpdate = {
  food: "Salsicha Premium Atualizada",
  quantity: "15",
  available: false,
};

export const expiratedDonationMock: IDonationRequest = {
  food: "Salsicha estragada",
  quantity: "5",
  expiration: "04/11/2022",
  classification: "62da0947-4c5a-46c6-8b4d-2cd4df7d4c89",
};

export const donationMockNo2: IDonationRequest = {
  food: "Salsicha azul",
  quantity: "13",
  expiration: "27/12/2022",
  classification: "62da0947-4c5a-46c6-8b4d-2cd4df7d4c89",
};

export const donationMockNo3 = {
  food: "Salsicha incompleta",
  expiration: "27/12/2022",
  classification: "62da0947-4c5a-46c6-8b4d-2cd4df7d4c89",
};

export const donationMockNo4 = {
  food: "Salsicha desclassificada",
  quantity: "11",
  expiration: "27/12/2022",
  classification: "62da0947-olakenzinho89",
};

export const donationMockNo5 = {
  food: "Salsicha perdida",
  quantity: "15",
  expiration: "27/12/2022",
  classification: "62da0947-olakenzinho89",
};

export const donationMock6: IDonationRequest = {
  food: "Salsicha embutida",
  quantity: "12",
  expiration: "25/12/2022",
  classification: "62da0947-4c5a-46c6-8b4d-2cd4df7d4c89",
};

export const donationMock7: IDonationRequest = {
  food: "Salsicha temperada",
  quantity: "12",
  expiration: "29/12/2022",
  classification: "62da0947-4c5a-46c6-8b4d-2cd4df7d4c89",
};

export const donationMock8: IDonationRequest = {
  food: "Salsicha Premium",
  quantity: "10",
  expiration: "31/12/2022",
  classification: "62da0947-4c5a-46c6-8b4d-2cd4df7d4c89",
};

export const donationMock9: IDonationRequest = {
  food: "Salsicha Light",
  quantity: "10",
  expiration: "31/12/2022",
  classification: "62da0947-4c5a-46c6-8b4d-2cd4df7d4c89",
};
