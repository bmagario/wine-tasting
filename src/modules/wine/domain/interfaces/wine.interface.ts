import { Wine } from '../entities/wine.entity';

export interface IWineRepository {
  findAll(): Promise<Wine[]>;
  findById(id: number): Promise<Wine | null>;
  create(wine: Wine): Promise<Wine>;
  update(id: number, wine: Partial<Wine>): Promise<Wine | undefined>;
  delete(id: number): Promise<void>;
}
