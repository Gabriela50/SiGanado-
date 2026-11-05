import { Injectable, NotFoundException } from '@nestjs/common';
import { HealthRecord } from './health.model';
import { CreateHealthDto, UpdateHealthDto } from './health.dto';

@Injectable()
export class HealthService {
  private healthRecords: HealthRecord[] = [
    {
      id: '1',
      animalId: 'anim-001',
      diagnostico: 'Control rutinario y desparasitación',
      tratamiento: 'Ivermectina 1% - 10ml subcutánea',
      veterinario: 'Dr. Carlos Benavides',
      fechaRevision: '2026-10-25',
      observaciones: 'Animal en buen estado general',
    },
  ];

  findAll() {
    return this.healthRecords;
  }

  findOne(id: string) {
    const record = this.healthRecords.find((item) => item.id === id);
    if (!record) {
      throw new NotFoundException(`Registro médico con ID ${id} no encontrado`);
    }
    return record;
  }

  create(payload: CreateHealthDto) {
    const newRecord = {
      id: (this.healthRecords.length + 1).toString(),
      ...payload,
    };
    this.healthRecords.push(newRecord);
    return newRecord;
  }

  update(id: string, payload: UpdateHealthDto) {
    const record = this.findOne(id);
    const index = this.healthRecords.findIndex((item) => item.id === id);

    this.healthRecords[index] = {
      ...record,
      ...payload,
    };
    return this.healthRecords[index];
  }

  remove(id: string) {
    const index = this.healthRecords.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Registro médico con ID ${id} no encontrado`);
    }
    this.healthRecords.splice(index, 1);
    return { message: `Registro médico con ID ${id} eliminado exitosamente` };
  }
}