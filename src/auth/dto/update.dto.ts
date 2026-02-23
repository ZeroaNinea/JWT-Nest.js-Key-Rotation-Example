import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
