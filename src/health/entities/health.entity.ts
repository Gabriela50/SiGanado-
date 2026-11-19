import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('health_records')
export class HealthEntity {
  // Identificador único del registro médico en PostgreSQL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  animalId: string;

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