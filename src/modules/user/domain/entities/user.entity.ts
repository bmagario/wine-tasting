import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import WineTasting from 'src/modules/wine/domain/entities/wine-tasting.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToMany(() => WineTasting, (wineTasting) => wineTasting.wine)
  wineTastings: WineTasting[];
}
