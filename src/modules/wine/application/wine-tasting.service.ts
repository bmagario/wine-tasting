import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { WineTastingRepository } from '../infrastructure/repositories/wine-tasting.repository';
import { WineTasting } from '../domain/entities/wine-tasting.entity';
import {
  CreateWineTastingDto,
  UpdateWineTastingDto,
} from './dto/wine-tasting.dto';

@Injectable()
export class WineTastingService {
  constructor(private readonly wineTastingRepository: WineTastingRepository) {}

  async getWineTastingsByWineId(wineId: number): Promise<WineTasting[]> {
    const wineTastings =
      await this.wineTastingRepository.findWineTastingsByWineId(wineId);
    return wineTastings;
  }

  async getWineTastingById(id: number): Promise<WineTasting> {
    const wineTasting = await this.wineTastingRepository.findById(id);
    if (!wineTasting) {
      throw new NotFoundException('Wine tasting not found');
    }
    return wineTasting;
  }

  async createWineTasting(
    userId: number,
    createWineTastingDto: CreateWineTastingDto,
  ): Promise<WineTasting> {
    // TODO: [WT-3] find out how to get the user and add it to wine tasting and also the wine
    const user = plainToClass(WineTasting, createWineTastingDto);
    return this.wineTastingRepository.create(user);
  }

  async updateWineTasting(
    userId: number,
    id: number,
    updateWineTastingDto: UpdateWineTastingDto,
  ): Promise<WineTasting> {
    const wineTasting = await this.wineTastingRepository.findById(id);
    if (!wineTasting) {
      throw new NotFoundException('Wine Tasting not found');
    }

    const updatedWineTasting = plainToClass(WineTasting, updateWineTastingDto);
    this.wineTastingRepository.update(id, updatedWineTasting);
    return updatedWineTasting;
  }

  async deleteWineTasting(id: number): Promise<void> {
    await this.wineTastingRepository.delete(id);
  }
}
