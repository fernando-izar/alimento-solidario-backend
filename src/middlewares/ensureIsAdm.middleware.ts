import { Request, Response, NextFunction } from "express";

const ensureIsAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user.isAdm) {
        if(req.method === "PATCH") {
            return res.status(401).json({
                message: "User is not admin!"
            })
        }
        return res.status(403).json({
            message: "Admin permission required!"
        })
    }
    return next();
};

export default ensureIsAdmMiddleware;