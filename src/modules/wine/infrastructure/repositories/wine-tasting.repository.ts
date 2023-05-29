import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IWineTastingRepository } from '../../domain/interfaces/wine-tasting.interface';
import { WineTasting } from '../../domain/entities/wine-tasting.entity';

export class WineTastingRepository implements IWineTastingRepository {
  constructor(
    @InjectRepository(WineTasting)
    private repository: Repository<WineTasting>,
  ) {}

  async findWineTastingsByWineId(wineId: number): Promise<WineTasting[]> {
    return this.repository.find({
      where: { wine: { id: wineId } },
      relations: ['wine'],
    });
  }

  async create(wineTastingData: Partial<WineTasting>): Promise<WineTasting> {
    const wine = this.repository.create(wineTastingData);
    return this.repository.save(wine);
  }

  async findAll(): Promise<WineTasting[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<WineTasting | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  async update(
    id: number,
    wineTastingData: Partial<WineTasting>,
  ): Promise<WineTasting | undefined> {
    await this.repository.update(id, wineTastingData);
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
