import { Response, Request, NextFunction } from "express";
import UserModel from "../../models/user";
import { LoginDto, RegisterDto } from "../../dtos/Dtos";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import config from "config"

export = new (class {
  register = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) 
    {
      res.status(400).json({ message: "Email already exists" });
      return;
    }
  
    try
    {
      const newRegister : RegisterDto = req.body;
      const salt = await bcrypt.genSalt(10);
      newRegister.password = await bcrypt.hash(newRegister.password, salt);

      const newUser = await UserModel.create(newRegister);
      res.status(200).json({ message:"user created",data:newUser});
    }catch(error)
    {
      next(error);
    }
    
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const login :LoginDto = req.body;
    const user = await UserModel.findOne({email:login.email});
    if (!user) 
    {
      res.status(400).json({message:"invalid email or password"});
      return;
    }
    const isValid:boolean = await bcrypt.compare(login.password, user.password);
    if (!isValid)
    {
      res.status(400).json({message:"invalid email or password"});
      return;
    }

    const Token = jwt.sign({_id:user.id},config.get<string>("jwt_key"));
    res.status(200).json({message:"successfully login",data:Token});  

  };
})();
