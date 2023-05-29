import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  readonly password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  readonly password?: string;
}
