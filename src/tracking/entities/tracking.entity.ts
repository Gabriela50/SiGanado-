import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnimalEntity } from '../../animals/entities/animal.entity';

@Entity('tracking_records')
export class TrackingEntity {
  // Identificador único del registro de seguimiento en PostgreSQL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Llave foránea hacia animals.id
  @Column({ type: 'uuid' })
  animalId: string;

  // Muchos registros de seguimiento pertenecen a un animal
  @ManyToOne(() => AnimalEntity, (animal) => animal.seguimientos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'animalId' })
  animal: AnimalEntity;

  @Column({ type: 'varchar' })
  loteUbicacion: string;

  @Column({ type: 'varchar', nullable: true })
  coordenadasGPS?: string;

  @Column({ type: 'varchar' })
  fechaMovimiento: string;

  @Column({ type: 'varchar' })
  responsable: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;
}
