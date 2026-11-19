import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnimalEntity } from '../../animals/entities/animal.entity';

@Entity('feedings')
export class FeedingEntity {
  // Identificador único del registro de alimentación en PostgreSQL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Llave foránea hacia animals.id
  @Column({ type: 'uuid' })
  animalId: string;

  // Muchos registros de alimentación pertenecen a un animal
  @ManyToOne(() => AnimalEntity, (animal) => animal.alimentaciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'animalId' })
  animal: AnimalEntity;

  @Column({ type: 'varchar' })
  tipoAlimento: string;

  @Column({ type: 'float' })
  cantidadKg: number;

  @Column({ type: 'varchar' })
  fechaRegistro: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;
}
