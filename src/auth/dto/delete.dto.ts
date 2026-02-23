import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteDto {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
