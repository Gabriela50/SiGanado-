import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnimalEntity } from '../../animals/entities/animal.entity';

@Entity('vaccines')
export class VaccineEntity {
  // Identificador único de la vacuna en PostgreSQL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Llave foránea hacia animals.id
  @Column({ type: 'uuid' })
  animalId: string;

  // Muchas vacunas pertenecen a un animal
  @ManyToOne(() => AnimalEntity, (animal) => animal.vacunas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'animalId' })
  animal: AnimalEntity;

  @Column({ type: 'varchar' })
  nombreVacuna: string;

  @Column({ type: 'int' })
  dosis: number;

  @Column({ type: 'varchar' })
  fechaAplicacion: string;

  @Column({ type: 'varchar', nullable: true })
  proximaDosis?: string;

  @Column({ type: 'varchar', nullable: true })
  lote?: string;

  @Column({ type: 'varchar' })
  responsable: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;
}
