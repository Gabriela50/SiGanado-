import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feedings')
export class FeedingEntity {
  // Identificador único del registro de alimentación en PostgreSQL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  animalId: string;

  @Column({ type: 'varchar' })
  tipoAlimento: string;

  @Column({ type: 'float' })
  cantidadKg: number;

  @Column({ type: 'varchar' })
  fechaRegistro: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;
}