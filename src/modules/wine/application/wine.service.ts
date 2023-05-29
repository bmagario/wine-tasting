import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { WineRepository } from '../infrastructure/repositories/wine.repository';
import { Wine } from '../domain/entities/wine.entity';
import { CreateWineDto, UpdateWineDto } from './dto/wine.dto';

@Injectable()
export class WineService {
  constructor(private readonly wineRepository: WineRepository) {}

  async getAllWines(): Promise<Wine[]> {
    const wines = await this.wineRepository.findAll();
    return wines;
  }

  async getWineById(id: number): Promise<Wine> {
    const wine = await this.wineRepository.findById(id);
    if (!wine) {
      throw new NotFoundException('Wine not found');
    }
    return wine;
  }

  async createWine(createWineDto: CreateWineDto): Promise<Wine> {
    const user = plainToClass(Wine, createWineDto);
    return this.wineRepository.create(user);
  }

  async updateWine(id: number, updateWineDto: UpdateWineDto): Promise<Wine> {
    const wine = await this.wineRepository.findById(id);
    if (!wine) {
      throw new NotFoundException('Wine  not found');
    }

    const updatedWine = plainToClass(Wine, updateWineDto);
    this.wineRepository.update(id, updatedWine);
    return updatedWine;
  }

  async deleteWine(id: number): Promise<void> {
    await this.wineRepository.delete(id);
  }
}
