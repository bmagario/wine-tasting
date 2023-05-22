import { Module } from '@nestjs/common';
import { WineController } from './infrastructure/controllers/wine.controller';
import { WineTastingController } from './infrastructure/controllers/wine-tasting.controller';
import { WineService } from './application/wine.service';
import { WineTastingService } from './application/wine-tasting.service';
import { WineRepository } from './domain/repositories/wine.repository';
import { WineTastingRepository } from './domain/repositories/wine-tasting.repository';

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
