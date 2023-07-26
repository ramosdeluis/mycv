import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsStrongPassword({
    minLength: 0,
    minLowercase: 0,
    minNumbers: 4,
    minSymbols: 0,
    minUppercase: 0,
  })
  @IsOptional()
  password: string;
}
