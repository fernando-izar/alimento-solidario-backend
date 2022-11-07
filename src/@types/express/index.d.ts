import * as express from "express"
import { IDonationUpdate } from "../../interfaces/donations"

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string,
                isAdm: boolean,
                type: string
            }
            updateDonation: IDonationUpdate
        }
    }
}