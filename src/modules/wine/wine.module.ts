import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WineController } from './application/controllers/wine.controller';
import { WineTastingController } from './application/controllers/wine-tasting.controller';
import { WineService } from './application/wine.service';
import { WineTastingService } from './application/wine-tasting.service';
import { WineRepository } from './infrastructure/repositories/wine.repository';
import { WineTastingRepository } from './infrastructure/repositories/wine-tasting.repository';
import { Wine } from './domain/entities/wine.entity';
import { WineTasting } from './domain/entities/wine-tasting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wine, WineTasting])],
  controllers: [WineController, WineTastingController],
  providers: [
    WineRepository,
    WineTastingRepository,
    WineService,
    WineTastingService,
  ],
  exports: [WineRepository, WineTastingRepository],
})
export class WineModule {}
