import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WineService } from '../../application/wine.service';
import { CreateWineDto, UpdateWineDto } from '../../application/dto/wine.dto';

@Controller('wines')
export class WineController {
  constructor(private readonly wineService: WineService) {}

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
    return this.wineService.updateWine(id, updateWineDto);
  }

  @Delete(':id')
  async deleteWine(@Param('id') id: number) {
    return this.wineService.deleteWine(id);
  }
}
