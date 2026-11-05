import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackingRecord } from './tracking.model';
import { CreateTrackingDto, UpdateTrackingDto } from './tracking.dto';

@Injectable()
export class TrackingService {
  private trackingRecords: TrackingRecord[] = [
    {
      id: '1',
      animalId: 'anim-001',
      loteUbicacion: 'Potrero El Alto (Lote 3)',
      coordenadasGPS: '1.2136° N, 77.2811° W',
      fechaMovimiento: '2026-10-28',
      responsable: 'Carlos Pérez',
      observaciones: 'Traslado por rotación de pastoreo',
    },
  ];

  findAll() {
    return this.trackingRecords;
  }

  findOne(id: string) {
    const record = this.trackingRecords.find((item) => item.id === id);
    if (!record) {
      throw new NotFoundException(`Registro de seguimiento con ID ${id} no encontrado`);
    }
    return record;
  }

  create(payload: CreateTrackingDto) {
    const newRecord = {
      id: (this.trackingRecords.length + 1).toString(),
      ...payload,
    };
    this.trackingRecords.push(newRecord);
    return newRecord;
  }

  update(id: string, payload: UpdateTrackingDto) {
    const record = this.findOne(id);
    const index = this.trackingRecords.findIndex((item) => item.id === id);

    this.trackingRecords[index] = {
      ...record,
      ...payload,
    };
    return this.trackingRecords[index];
  }

  remove(id: string) {
    const index = this.trackingRecords.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Registro de seguimiento con ID ${id} no encontrado`);
    }
    this.trackingRecords.splice(index, 1);
    return { message: `Registro de seguimiento con ID ${id} eliminado exitosamente` };
  }
}