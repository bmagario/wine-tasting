import { Module } from '@nestjs/common';
import { WineController } from './application/controllers/wine.controller';
import { WineTastingController } from './application/controllers/wine-tasting.controller';
import { WineRepository } from './infrastructure/repositories/wine.repository';
import { WineTastingRepository } from './infrastructure/repositories/wine-tasting.repository';
import { WineService } from './application/wine.service';
import { WineTastingService } from './application/wine-tasting.service';

@Module({
  controllers: [WineController, WineTastingController],
  providers: [
    WineService,
    WineTastingService,
    WineRepository,
    WineTastingRepository,
  ],
})
export class WineModule {}