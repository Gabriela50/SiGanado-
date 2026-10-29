import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CreateFeedingDto {
  @IsString()
  @IsNotEmpty()
  animalId: string;

  @IsString()
  @IsNotEmpty()
  tipoAlimento: string;

  @IsNumber()
  @Min(0.1)
  cantidadKg: number;

  @IsString()
  @IsNotEmpty()
  fechaRegistro: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}

export class UpdateFeedingDto {
  @IsString()
  @IsOptional()
  animalId?: string;

  @IsString()
  @IsOptional()
  tipoAlimento?: string;

  @IsNumber()
  @Min(0.1)
  @IsOptional()
  cantidadKg?: number;

  @IsString()
  @IsOptional()
  fechaRegistro?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}

// hh
