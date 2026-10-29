import { Injectable, NotFoundException } from '@nestjs/common';
import { Feeding } from './feeding.model';
import { CreateFeedingDto, UpdateFeedingDto } from './feeding.dto';

@Injectable()
export class FeedingService {
  private feedings: Feeding[] = [
    {
      id: '1',
      animalId: 'anim-001',
      tipoAlimento: 'Pasto de corte (King Grass)',
      cantidadKg: 15.5,
      fechaRegistro: '2026-10-28',
      observaciones: 'Se suministró en la mañana',
    },
  ];

  findAll() {
    return this.feedings;
  }

  findOne(id: string) {
    const feeding = this.feedings.find((item) => item.id === id);
    if (!feeding) {
      throw new NotFoundException(`Registro de alimentación con ID ${id} no encontrado`);
    }
    return feeding;
  }

  create(payload: CreateFeedingDto) {
    const newFeeding = {
      id: (this.feedings.length + 1).toString(),
      ...payload,
    };
    this.feedings.push(newFeeding);
    return newFeeding;
  }

  update(id: string, payload: UpdateFeedingDto) {
    const feeding = this.findOne(id);
    const index = this.feedings.findIndex((item) => item.id === id);
    
    this.feedings[index] = {
      ...feeding,
      ...payload,
    };
    return this.feedings[index];
  }

  remove(id: string) {
    const index = this.feedings.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Registro de alimentación con ID ${id} no encontrado`);
    }
    this.feedings.splice(index, 1);
    return { message: `Registro con ID ${id} eliminado exitosamente` };
  }
}