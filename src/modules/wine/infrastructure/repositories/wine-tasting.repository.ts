import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WineTasting } from '../../domain/entities/wine-tasting.entity';

@Injectable()
export class WineTastingRepository {
  constructor(
    @InjectModel(WineTasting)
    private wineTastingModel: typeof WineTasting,
  ) {}

  async findById(id: number): Promise<WineTasting | null> {
    return this.wineTastingModel.findByPk(id);
  }

  async createWineTasting(data: Partial<WineTasting>): Promise<WineTasting> {
    return this.wineTastingModel.create(data);
  }

  async updateWineTasting(data: Partial<WineTasting>): Promise<WineTasting> {
    await this.wineTastingModel.update(data, { where: { id: data.id } });
    return this.wineTastingModel.findByPk(data.id);
  }

  async deleteWineTasting(id: number): Promise<number> {
    return this.wineTastingModel.destroy({ where: { id } });
  }
}
