import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ message: "validation Error", details: err.errors });
    return;
  }

  if (err instanceof mongoose.Error )
  {
    res.status(400).json({ message:"mongoose Error", details: err.message });
    return;
  }

  if (err instanceof Error){
     res.status(500).json({ message: "Internal server error", detials: err.message||"An unknown error occurred"});
     return;
  }

  res.status(500).json({message:"Intgernal server error",details:""});  

};
