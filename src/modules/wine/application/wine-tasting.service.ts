import { Injectable, NotFoundException } from '@nestjs/common';
import { WineTastingRepository } from '../domain/repositories/wine-tasting.repository';
import { WineTasting } from '../domain/entities/wine-tasting.entity';
import {
  CreateWineTastingDto,
  UpdateWineTastingDto,
} from './dto/wine-tasting.dto';

@Injectable()
export class WineTastingService {
  constructor(private readonly wineTastingRepository: WineTastingRepository) {}

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
    const { wineId, notes, rating } = createWineTastingDto;
    const wineTasting = new WineTasting();
    wineTasting.wineId = wineId;
    wineTasting.notes = notes;
    wineTasting.rating = rating;
    return this.wineTastingRepository.createWineTasting(wineTasting);
  }

  async updateWineTasting(
    userId: number,
    id: number,
    updateWineTastingDto: UpdateWineTastingDto,
  ): Promise<WineTasting> {
    const wineTasting = await this.getWineTastingById(id);
    wineTasting.notes = updateWineTastingDto.notes || wineTasting.notes;
    wineTasting.rating = updateWineTastingDto.rating || wineTasting.rating;
    return this.wineTastingRepository.updateWineTasting(wineTasting);
  }

  async deleteWineTasting(id: number): Promise<void> {
    await this.wineTastingRepository.deleteWineTasting(id);
  }
}
