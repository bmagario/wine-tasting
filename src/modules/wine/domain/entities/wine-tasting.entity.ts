import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Wine } from './wine.entity';
import { User } from '../../../user/domain/entities/user.entity';

@Table({ tableName: 'wine_tasting' })
export class WineTasting extends Model<WineTasting> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  notes: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
  })
  rating: number;

  @ForeignKey(() => Wine)
  @Column({
    allowNull: false,
  })
  wineId: number;

  @BelongsTo(() => Wine)
  wine: Wine;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
