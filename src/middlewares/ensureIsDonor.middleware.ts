import { Request, Response, NextFunction } from "express";

const ensureIsDonor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.type.toLowerCase() === "donor") {
    return next();
  }
  return res.status(403).json({
    message: "User is not donor!",
  });
};

export default ensureIsDonor;
