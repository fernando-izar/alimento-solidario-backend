import { Request, Response, NextFunction } from "express";

const validationBodyPatchMiddleware = async (req: Request, res:Response, next: NextFunction) => {
    const bodyPatch = req.body;

    const keyValues = Object.keys(bodyPatch);

    if(keyValues.includes("isAdm") || keyValues.includes("isActive") ||keyValues.includes("id")) {
        return res.status(401).json({
            message: "This property does not be modified!"
        })
    }

    return next();
}

export default validationBodyPatchMiddleware;
