import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureAuthMiddleware =async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({
            message: "Authentication required!"
        })
    }

    token = token.split(" ")[1];

    jwt.verify(token,
        process.env.SECRET_KEY as string,
        (error, decoded: any) => {
            if(error) {
                return res.status(401).json({
                    message: "Invalid token!"
                })
            }

            req.user = {
                type: decoded.type,
                isAdm: decoded.isAdm,
                id: decoded.sub,
                email: decoded.email
            }

            return next();
        })
};

export default ensureAuthMiddleware;