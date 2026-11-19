import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vaccines')
export class VaccineEntity {
  // Identificador único de la vacuna en PostgreSQL
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  animalId: string;

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