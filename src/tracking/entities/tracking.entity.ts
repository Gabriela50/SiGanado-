import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracking_records')
export class TrackingEntity {
  // Identificador único del registro de seguimiento en PostgreSQL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  animalId: string;

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