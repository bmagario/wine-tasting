import { IsString, IsInt, IsOptional, Min, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateWineDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value && String(value))
  readonly name?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value && String(value))
  readonly description?: string;

  @IsInt()
  @IsOptional()
  readonly year?: number;

  @IsString()
  @IsOptional()
  readonly type?: string;

  @IsInt()
  @IsOptional()
  readonly vintage?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  readonly price?: number;
}

export class UpdateWineDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value && String(value))
  readonly name?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value && String(value))
  readonly description?: string;

  @IsInt()
  @IsOptional()
  readonly year?: number;

  @IsString()
  @IsOptional()
  readonly type?: string;

  @IsInt()
  @IsOptional()
  readonly vintage?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  readonly price?: number;
}
