import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrackingDto {
  @IsString()
  @IsNotEmpty()
  animalId: string;

  @IsString()
  @IsNotEmpty()
  loteUbicacion: string;

  @IsString()
  @IsOptional()
  coordenadasGPS?: string;

  @IsString()
  @IsNotEmpty()
  fechaMovimiento: string;

  @IsString()
  @IsNotEmpty()
  responsable: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}

export class UpdateTrackingDto {
  @IsString()
  @IsOptional()
  animalId?: string;

  @IsString()
  @IsOptional()
  loteUbicacion?: string;

  @IsString()
  @IsOptional()
  coordenadasGPS?: string;

  @IsString()
  @IsOptional()
  fechaMovimiento?: string;

  @IsString()
  @IsOptional()
  responsable?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}