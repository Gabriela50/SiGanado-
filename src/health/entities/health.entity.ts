import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnimalEntity } from '../../animals/entities/animal.entity';

@Entity('health_records')
export class HealthEntity {
  // Identificador único del registro médico en PostgreSQL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Llave foránea hacia animals.id
  @Column({ type: 'uuid' })
  animalId: string;

  // Muchos registros médicos pertenecen a un animal
  @ManyToOne(() => AnimalEntity, (animal) => animal.registrosSalud, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'animalId' })
  animal: AnimalEntity;

  @Column({ type: 'varchar' })
  diagnostico: string;

  @Column({ type: 'varchar' })
  tratamiento: string;

  @Column({ type: 'varchar' })
  veterinario: string;

  @Column({ type: 'varchar' })
  fechaRevision: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;
}
