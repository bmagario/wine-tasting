import { Repository } from 'typeorm';
import { Wine } from '../../domain/entities/wine.entity';
import { IWineRepository } from '../../domain/interfaces/wine.interface';
import { InjectRepository } from '@nestjs/typeorm';

export class WineRepository implements IWineRepository {
  constructor(
    @InjectRepository(Wine)
    private repository: Repository<Wine>,
  ) {}

  async create(wineData: Partial<Wine>): Promise<Wine> {
    const wine = this.repository.create(wineData);
    return this.repository.save(wine);
  }

  async findAll(): Promise<Wine[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Wine | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  async update(wineData: Partial<Wine>): Promise<Wine | undefined> {
    const id = wineData.id;
    await this.repository.update(wineData.id, wineData);
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
