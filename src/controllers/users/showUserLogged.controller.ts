import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import showUserProfileService from "../../services/users/showUserLogged.service";
import showUserLoggedService from "../../services/users/showUserLogged.service";

const showUserLoggedController = async (req: Request, res: Response) => {
    const userIdFound = req.user.id
    const userFound = await showUserLoggedService(userIdFound);
    return res.json(instanceToPlain(userFound));
};

export default showUserLoggedController;