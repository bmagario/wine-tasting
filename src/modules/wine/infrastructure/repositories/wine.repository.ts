import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wine } from '../../domain/entities/wine.entity';

@Injectable()
export class WineRepository {
  constructor(
    @InjectModel(Wine)
    private wineModel: typeof Wine,
  ) {}

  async findById(id: number): Promise<Wine | null> {
    return this.wineModel.findByPk(id);
  }

  async createWine(data: Partial<Wine>): Promise<Wine> {
    return this.wineModel.create(data);
  }

  async updateWine(data: Partial<Wine>): Promise<Wine> {
    await this.wineModel.update(data, { where: { id: data.id } });
    return this.wineModel.findByPk(data.id);
  }

  async deleteWine(id: number): Promise<number> {
    return this.wineModel.destroy({ where: { id } });
  }
}
