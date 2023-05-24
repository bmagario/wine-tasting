import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WineController } from './application/controllers/wine.controller';
import { WineTastingController } from './application/controllers/wine-tasting.controller';
import { WineService } from './application/wine.service';
import { WineTastingService } from './application/wine-tasting.service';
import { WineRepository } from './infrastructure/repositories/wine.repository';
import { WineTastingRepository } from './infrastructure/repositories/wine-tasting.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WineRepository, WineTastingRepository])],
  controllers: [WineController, WineTastingController],
  providers: [WineService, WineTastingService],
})
export class WineModule {}
