import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { WineController } from './application/controllers/wine.controller';
import { WineTastingController } from './application/controllers/wine-tasting.controller';
import { WineService } from './application/wine.service';
import { WineTastingService } from './application/wine-tasting.service';
import { IWineRepository } from './domain/interfaces/wine.interface';
import { WineRepository } from './infrastructure/repositories/wine.repository';
import { IWineTastingRepository } from './domain/interfaces/wine-tasting.interface';
import { WineTastingRepository } from './infrastructure/repositories/wine-tasting.repository';
import { Wine } from './domain/entities/wine.entity';
import { WineTasting } from './domain/entities/wine-tasting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wine, WineTasting])],
  controllers: [WineController, WineTastingController],
  providers: [
    WineService,
    {
      provide: WineRepository,
      useFactory: (dataSource: DataSource) => {
        return new WineRepository(dataSource.getRepository(Wine));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: WineService,
      useFactory: (repo: IWineRepository) => {
        return new WineService(repo);
      },
      inject: [WineRepository],
    },
    WineTastingService,
    {
      provide: WineTastingRepository,
      useFactory: (dataSource: DataSource) => {
        return new WineTastingRepository(dataSource.getRepository(WineTasting));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: WineTastingService,
      useFactory: (repo: IWineTastingRepository) => {
        return new WineTastingService(repo);
      },
      inject: [WineTastingRepository],
    },
  ],
})
export class WineModule {}
