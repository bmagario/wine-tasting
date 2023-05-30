import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WineService } from '../wine.service';
import { CreateWineDto, UpdateWineDto } from '../dto/wine.dto';

@Controller('wine')
export class WineController {
  constructor(private readonly wineService: WineService) {}

  @Get('all')
  async getWines() {
    return this.wineService.getAllWines();
  }

  @Get(':id')
  async getWine(@Param('id') id: number) {
    return this.wineService.getWineById(id);
  }

  @Post()
  async createWine(@Body() createWineDto: CreateWineDto) {
    return this.wineService.createWine(createWineDto);
  }

  @Put(':id')
  async updateWine(
    @Param('id') id: number,
    @Body() updateWineDto: UpdateWineDto,
  ) {
    if (id === updateWineDto.id) {
      return this.wineService.updateWine(updateWineDto);
    }
    // TODO: [WT-4] Handle this error.
  }

  @Delete(':id')
  async deleteWine(@Param('id') id: number) {
    return this.wineService.deleteWine(id);
  }
}
