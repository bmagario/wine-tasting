import { WineTasting } from '../entities/wine-tasting.entity';

export interface IWineTastingRepository {
  findAll(): Promise<WineTasting[]>;
  findById(id: number): Promise<WineTasting | null>;
  create(wineTasting: WineTasting): Promise<WineTasting>;
  update(wineTasting: WineTasting): Promise<WineTasting | null>;
  delete(id: number): Promise<number>;
}
