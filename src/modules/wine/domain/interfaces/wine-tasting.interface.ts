import { WineTasting } from '../entities/wine-tasting.entity';

export interface IWineTastingRepository {
  findWineTastingsByWineId(wineId: number): Promise<WineTasting[]>;
  findAll(): Promise<WineTasting[]>;
  findById(id: number): Promise<WineTasting | null>;
  create(wineTasting: WineTasting): Promise<WineTasting>;
  update(
    id: number,
    wineTasting: Partial<WineTasting>,
  ): Promise<WineTasting | undefined>;
  delete(id: number): Promise<void>;
}
