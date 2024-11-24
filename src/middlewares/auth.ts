import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "config";
import UserModel from "../models/user";

interface CustomRequest extends Request {
  user?: any;
}

const isLogin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).send("access denied");
    return;
  }

  try {
    const decoded = jwt.verify(token, config.get<string>("jwt_key"));
    if (typeof decoded === "object" && "_id" in decoded) {
      const user = await UserModel.findById((decoded as JwtPayload)._id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).send("user not found");
        return;
      }
    } else {
      res.status(400).send("Invalid token payload");
    }
  } catch (err) {
    res.status(400).send("invalid token");
  }
};

export default isLogin;
