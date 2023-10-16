import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  id: number;
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  @MaxLength(20, { message: 'A senha nao pode passar de 20 caracteres' })
  password: string;
}
