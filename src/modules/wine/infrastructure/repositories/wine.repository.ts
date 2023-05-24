import { Repository } from 'typeorm';
import { Wine } from '../../domain/entities/wine.entity';

export class WineRepository extends Repository<Wine> {
  async createWine(wineData: Partial<Wine>): Promise<Wine> {
    const wine = this.create(wineData);
    return this.save(wine);
  }

  async findAllWines(): Promise<Wine[]> {
    return this.find();
  }

  async findWineById(id: number): Promise<Wine | undefined> {
    return this.findOne({ where: { id } });
  }

  async updateWine(
    id: number,
    wineData: Partial<Wine>,
  ): Promise<Wine | undefined> {
    await this.update(id, wineData);
    return this.findOne({ where: { id } });
  }

  async deleteWine(id: number): Promise<void> {
    await this.delete(id);
  }
}
