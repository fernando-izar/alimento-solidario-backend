export interface IAddressRequest {
    address: string
    complement: string
    city: string
    state: string
    zipCode: string
}

export interface IAddressUpdate {
    address?: string
    complement?: string
    city?: string
    state?: string
    zipCode?: string
}