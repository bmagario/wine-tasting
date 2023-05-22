import { Injectable, NotFoundException } from '@nestjs/common';
import { WineRepository } from '../domain/repositories/wine.repository';
import { Wine } from '../domain/entities/wine.entity';
import { CreateWineDto, UpdateWineDto } from './dto/wine.dto';

@Injectable()
export class WineService {
  constructor(private readonly wineRepository: WineRepository) {}

  async getWineById(id: number): Promise<Wine> {
    const wine = await this.wineRepository.findById(id);
    if (!wine) {
      throw new NotFoundException('Wine not found');
    }
    return wine;
  }

  async createWine(createWineDto: CreateWineDto): Promise<Wine> {
    const { name, year, type, description, price, vintage } = createWineDto;
    const wine = new Wine();
    wine.name = name;
    wine.year = year;
    wine.type = type;
    wine.description = description;
    wine.vintage = vintage;
    wine.price = price;
    return this.wineRepository.createWine(wine);
  }

  async updateWine(id: number, updateWineDto: UpdateWineDto): Promise<Wine> {
    const wine = await this.getWineById(id);
    wine.name = updateWineDto.name || wine.name;
    wine.year = updateWineDto.year || wine.year;
    wine.type = updateWineDto.type || wine.type;
    return this.wineRepository.updateWine(wine);
  }

  async deleteWine(id: number): Promise<void> {
    const wine = await this.getWineById(id);
    await this.wineRepository.deleteWine(id);
  }
}
