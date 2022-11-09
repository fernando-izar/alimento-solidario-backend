import { Request, Response, NextFunction } from "express";

const ensureIsCharity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.type.toLowerCase() === "charity") {
    return next();
  }
  return res.status(403).json({
    message: "User is not charity!",
  });
};

export default ensureIsCharity;
