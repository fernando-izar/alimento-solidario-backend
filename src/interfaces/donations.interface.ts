export interface IDonationRequest {
  food: string;
  quantity: string;
  expiration: string;
  classification: string;
}

export interface IDonationUpdate {
  food?: string;
  quantity?: string;
  available?: boolean;
}
