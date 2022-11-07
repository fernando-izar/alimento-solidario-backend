import { Request, Response } from "express"
import deleteDonationService from "../../services/donations/deleteDonation.service"

const deleteDonationController = async (req: Request, res: Response) => {
    const donationId: string = req.params.id
    const userId: string = req.user.id
    await deleteDonationService(donationId, userId)

    return res.status(204).json({
        message: "Donation deleted with success"
    })
}

export default deleteDonationController