import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { WineTastingService } from '../wine-tasting.service';
import {
  CreateWineTastingDto,
  UpdateWineTastingDto,
} from '../dto/wine-tasting.dto';

@Controller('wine-tastings')
export class WineTastingController {
  constructor(private readonly wineTastingService: WineTastingService) {}

  @Get(':wine_id')
  async getWineTastings(@Param('wine_id') wineId: number) {
    return this.wineTastingService.getWineTastingsByWineId(wineId);
  }

  @Get(':id')
  async getWineTasting(@Param('id') id: number) {
    return this.wineTastingService.getWineTastingById(id);
  }

  @Post()
  createWineTasting(
    @Req() request: Request,
    @Body() createWineTastingDto: CreateWineTastingDto,
  ) {
    // TODO: [WT-2] Get user id from token.
    const userId = 1;
    return this.wineTastingService.createWineTasting(
      userId,
      createWineTastingDto,
    );
  }

  @Put(':id')
  async updateWineTasting(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() updateWineTastingDto: UpdateWineTastingDto,
  ) {
    // TODO: [WT-2] Get user id from token.
    const userId = 1;
    return this.wineTastingService.updateWineTasting(
      userId,
      id,
      updateWineTastingDto,
    );
  }

  @Delete(':id')
  async deleteWineTasting(@Param('id') id: number) {
    return this.wineTastingService.deleteWineTasting(id);
  }
}
