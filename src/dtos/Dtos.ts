import { IsEmail, isNotEmpty, IsNotEmpty, Length, validate } from "class-validator";
class RegisterDto {
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @Length(4,20)
  username:string;

  @IsNotEmpty()
  password:string;

  isAdmin:boolean;
}

class LoginDto {
  @IsEmail()
  email:string;
  @IsNotEmpty()
  password:string;
}

export {LoginDto,RegisterDto}

