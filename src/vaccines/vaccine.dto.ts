import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateVaccineDto {
  @IsString()
  @IsNotEmpty()
  animalId: string;

  @IsString()
  @IsNotEmpty()
  nombreVacuna: string;

  @IsInt()
  @Min(1)
  dosis: number;

  @IsDateString()
  fechaAplicacion: string;

  @IsDateString()
  @IsOptional()
  proximaDosis?: string;

  @IsString()
  @IsOptional()
  lote?: string;

  @IsString()
  @IsNotEmpty()
  responsable: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}

export class UpdateVaccineDto {
  @IsString()
  @IsOptional()
  animalId?: string;

  @IsString()
  @IsOptional()
  nombreVacuna?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  dosis?: number;

  @IsDateString()
  @IsOptional()
  fechaAplicacion?: string;

  @IsDateString()
  @IsOptional()
  proximaDosis?: string;

  @IsString()
  @IsOptional()
  lote?: string;

  @IsString()
  @IsOptional()
  responsable?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
