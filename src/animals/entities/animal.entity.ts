import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FeedingEntity } from '../../feeding/entities/feeding.entity';
import { HealthEntity } from '../../health/entities/health.entity';
import { TrackingEntity } from '../../tracking/entities/tracking.entity';
import { VaccineEntity } from '../../vaccines/entities/vaccine.entity';

@Entity('animals')
export class AnimalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  raza: string;

  @Column({ type: 'int' })
  edad: number;

  @Column({ type: 'float' })
  peso: number;

  @Column({ type: 'varchar', length: 20 })
  sexo: string;

  @Column({ type: 'varchar', length: 50 })
  estadoSalud: string;

  // Un animal tiene muchos registros en cada módulo (relación 1 a N)
  @OneToMany(() => FeedingEntity, (feeding) => feeding.animal)
  alimentaciones: FeedingEntity[];

  @OneToMany(() => HealthEntity, (health) => health.animal)
  registrosSalud: HealthEntity[];

  @OneToMany(() => TrackingEntity, (tracking) => tracking.animal)
  seguimientos: TrackingEntity[];

  @OneToMany(() => VaccineEntity, (vaccine) => vaccine.animal)
  vacunas: VaccineEntity[];
}
