import { Repository } from 'typeorm';
import { WineTasting } from '../../domain/entities/wine-tasting.entity';

export class WineTastingRepository extends Repository<WineTasting> {
  async createWineTasting(
    wineTastingData: Partial<WineTasting>,
  ): Promise<WineTasting> {
    const wine = this.create(wineTastingData);
    return this.save(wine);
  }

  async findAllWineTastings(): Promise<WineTasting[]> {
    return this.find();
  }

  async findWineTastingById(id: number): Promise<WineTasting | undefined> {
    return this.findOne({ where: { id } });
  }

  async updateWineTasting(
    id: number,
    wineTastingData: Partial<WineTasting>,
  ): Promise<WineTasting | undefined> {
    await this.update(id, wineTastingData);
    return this.findOne({ where: { id } });
  }

  async deleteWineTasting(id: number): Promise<void> {
    await this.delete(id);
  }
}
