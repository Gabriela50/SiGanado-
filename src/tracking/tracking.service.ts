import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackingEntity } from './entities/tracking.entity';
import { CreateTrackingDto, UpdateTrackingDto } from './tracking.dto';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(TrackingEntity)
    private readonly trackingRepository: Repository<TrackingEntity>,
  ) {}

  async findAll() {
    // Devuelve todos los registros de ubicación y movimiento
    return this.trackingRepository.find();
  }

  async findOne(id: string) {
    const record = await this.trackingRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(
        `Registro de seguimiento con ID ${id} no encontrado`,
      );
    }
    return record;
  }

  async create(payload: CreateTrackingDto) {
    const newRecord = this.trackingRepository.create(payload);
    return this.trackingRepository.save(newRecord);
  }

  async update(id: string, payload: UpdateTrackingDto) {
    const existingRecord = await this.findOne(id);
    const mergedRecord = this.trackingRepository.merge(
      existingRecord,
      payload,
    );
    return this.trackingRepository.save(mergedRecord);
  }

  async remove(id: string) {
    const existingRecord = await this.findOne(id);
    await this.trackingRepository.remove(existingRecord);
    return {
      message: `Registro de seguimiento con ID ${id} eliminado exitosamente`,
    };
  }
}