import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}