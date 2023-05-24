import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Wine } from './wine.entity';
import { User } from '../../../user/domain/entities/user.entity';

@Entity({ name: 'wine_tasting' })
export class WineTasting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  notes: string;

  @Column({ type: 'tinyint', nullable: false })
  rating: number;

  @ManyToOne(() => Wine, (wine) => wine.wineTastings, { nullable: false })
  wine: Wine;

  @ManyToOne(() => User, (user) => user.wineTastings, { nullable: false })
  user: User;
}

export default WineTasting;
