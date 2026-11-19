import { IsUUID, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrackingDto {
  @IsUUID()
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
  @IsUUID()
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