import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import WineTasting from './wine-tasting.entity';
import { IsOptional } from 'class-validator';

@Entity({ name: 'wine' })
export class Wine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false })
  year: number;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'integer', nullable: false })
  vintage: number;

  @IsOptional()
  @OneToMany(() => WineTasting, (wineTasting) => wineTasting.wine)
  wineTastings: WineTasting[];
}

export default Wine;
