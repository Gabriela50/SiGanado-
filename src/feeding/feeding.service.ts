import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedingEntity } from './entities/feeding.entity';
import { CreateFeedingDto, UpdateFeedingDto } from './feeding.dto';

@Injectable()
export class FeedingService {
  constructor(
    @InjectRepository(FeedingEntity)
    private readonly feedingRepository: Repository<FeedingEntity>,
  ) {}

  async findAll() {
    // Retorna todos los registros de alimentación almacenados en PostgreSQL
    return this.feedingRepository.find();
  }

  async findOne(id: string) {
    const feeding = await this.feedingRepository.findOne({ where: { id } });
    if (!feeding) {
      throw new NotFoundException(
        `Registro de alimentación con ID ${id} no encontrado`,
      );
    }
    return feeding;
  }

  async create(payload: CreateFeedingDto) {
    const newFeeding = this.feedingRepository.create(payload);
    return this.feedingRepository.save(newFeeding);
  }

  async update(id: string, payload: UpdateFeedingDto) {
    const existingFeeding = await this.findOne(id);
    const mergedFeeding = this.feedingRepository.merge(
      existingFeeding,
      payload,
    );
    return this.feedingRepository.save(mergedFeeding);
  }

  async remove(id: string) {
    const existingFeeding = await this.findOne(id);
    await this.feedingRepository.remove(existingFeeding);
    return { message: `Registro con ID ${id} eliminado exitosamente` };
  }
}