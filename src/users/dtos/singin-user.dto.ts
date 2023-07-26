import { IsEmail, IsStrongPassword } from 'class-validator';

export class SinginUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 0,
    minLowercase: 0,
    minNumbers: 4,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;
}
