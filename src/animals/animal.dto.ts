import { IsNotEmpty, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  raza: string;

  @IsNumber()
  @Min(0)
  edad: number;

  @IsNumber()
  @Min(0)
  peso: number;

  @IsString()
  @IsNotEmpty()
  sexo: string;

  @IsString()
  @IsNotEmpty()
  estadoSalud: string;
}

export class UpdateAnimalDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  raza?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  edad?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  peso?: number;

  @IsString()
  @IsOptional()
  sexo?: string;

  @IsString()
  @IsOptional()
  estadoSalud?: string;
}