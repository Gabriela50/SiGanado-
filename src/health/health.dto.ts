import { IsUUID, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHealthDto {
  @IsUUID()
  @IsNotEmpty()
  animalId: string;

  @IsString()
  @IsNotEmpty()
  diagnostico: string;

  @IsString()
  @IsNotEmpty()
  tratamiento: string;

  @IsString()
  @IsNotEmpty()
  veterinario: string;

  @IsString()
  @IsNotEmpty()
  fechaRevision: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}

export class UpdateHealthDto {
  @IsUUID()
  @IsOptional()
  animalId?: string;

  @IsString()
  @IsOptional()
  diagnostico?: string;

  @IsString()
  @IsOptional()
  tratamiento?: string;

  @IsString()
  @IsOptional()
  veterinario?: string;

  @IsString()
  @IsOptional()
  fechaRevision?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}