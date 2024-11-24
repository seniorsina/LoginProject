import { plainToClass } from "class-transformer";
import { validate, Validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { LoginDto, RegisterDto } from "../dtos/Dtos";

class AuthValidator {
  private static validateDto = async (
    dto: object,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const errors = await validate(dto);
      if (errors.length > 0) {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
        }));
        res.status(400).json({ errors: formattedErrors });
        return;
      }
      next();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Validation failed due to an internal error." });
    }
  };

  static validateRegister = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const registerDto = plainToClass(RegisterDto, req.body);
    return this.validateDto(registerDto, res, next); 
  };


  static validateLogin = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const loginDto = plainToClass(LoginDto, req.body);
    return this.validateDto(loginDto, res, next); 
  };
}

export default AuthValidator;
