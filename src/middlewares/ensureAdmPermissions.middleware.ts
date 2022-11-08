import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import jwtDecode, {JwtPayload} from "jwt-decode";

const ensureAdmPermissionsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.headers.authorization;
    const { id } = req.params;

    if (!token) {
        return res.status(401).json({
        message: "Invalid token!",
        });
    }

    const decodedToken = <JwtPayload>jwtDecode(token);
    const userRepository = AppDataSource.getRepository(User);
    const userLogged = await userRepository.findOneBy({ id: decodedToken.sub });
    const userFromParams = await userRepository.findOneBy({ id: id });

    if (!userFromParams) {
        return res.status(403).json({
        message: "User not found!"
        });
    }

    if (userLogged!.isAdm === false && userLogged!.id !== userFromParams.id) {
      return res.status(401).json({
        message: "Missing adm permissions!",
      });
    }

    return next();
  };
  export default ensureAdmPermissionsMiddleware;