import AppDataSource from "../../data-source"
import { Donation } from "../../entities/donations.entity"
import { User } from "../../entities/user.entity"
import AppError from "../../errors/appError"

const deleteDonationService = async (donationId: string, userId: string): Promise<void> => {
    const donationsRepository = AppDataSource.getRepository(Donation)
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        id: userId
    })

    const donation = await donationsRepository.findOne({
        where: {
            id: donationId
        }, 
        relations: {
            user: true
        }
    })
    
    if(!donation){
        throw new AppError("Donation do not exist", 404)
    }

    if(!donation.available){
        throw new AppError("Donation is not available", 404)
    }

    if(donation.user.id !== user?.id){
        throw new AppError("You don't have the permission to delete this donation", 403)
    }

    await donationsRepository.delete({
        id: donation.id
    })

    return
}

export default deleteDonationService