import { Wine } from '../entities/wine.entity';

export interface IWineRepository {
  findAll(): Promise<Wine[]>;
  findById(id: number): Promise<Wine | null>;
  create(wine: Wine): Promise<Wine>;
  update(wine: Wine): Promise<Wine | null>;
  delete(id: number): Promise<number>;
}
