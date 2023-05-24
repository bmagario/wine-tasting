import { Injectable, NotFoundException } from '@nestjs/common';
import { WineTastingRepository } from '../infrastructure/repositories/wine-tasting.repository';
import { WineTasting } from '../domain/entities/wine-tasting.entity';
import {
  CreateWineTastingDto,
  UpdateWineTastingDto,
} from './dto/wine-tasting.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WineTastingService {
  constructor(
    @InjectRepository(WineTastingRepository)
    private readonly wineTastingRepository: WineTastingRepository,
  ) {}

  async getWineTastingById(id: number): Promise<WineTasting> {
    const wineTasting = await this.wineTastingRepository.findWineTastingById(id);
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
    // wineTasting.wine = wineId;
    wineTasting.notes = notes;
    wineTasting.rating = rating;
    return this.wineTastingRepository.create(wineTasting);
  }

  async updateWineTasting(
    userId: number,
    id: number,
    updateWineTastingDto: UpdateWineTastingDto,
  ): Promise<WineTasting> {
    const wineTasting = await this.getWineTastingById(id);
    wineTasting.notes = updateWineTastingDto.notes || wineTasting.notes;
    wineTasting.rating = updateWineTastingDto.rating || wineTasting.rating;
    await this.wineTastingRepository.updateWineTasting(id, wineTasting);
    return this.wineTastingRepository.findWineTastingById(id);
  }

  async deleteWineTasting(id: number): Promise<void> {
    await this.wineTastingRepository.delete(id);
  }
}
