import { NotFoundException } from '@nestjs/common';
import { WineService } from 'src/modules/wine/application/wine.service';
import Wine from 'src/modules/wine/domain/entities/wine.entity';
import {
  CreateWineDto,
  UpdateWineDto,
} from 'src/modules/wine/application/dto/wine.dto';
import { IWineRepository } from 'src/modules/wine/domain/interfaces/wine.interface';

describe('WineService', () => {
  let wineService: WineService;
  let wineRepository: IWineRepository;

  beforeEach(() => {
    const wineRepositoryMock: Partial<IWineRepository> = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    wineRepository = wineRepositoryMock as IWineRepository;
    wineService = new WineService(wineRepository);
  });

  describe('getAllWines', () => {
    it('should return an array of wines', async () => {
      const wines = [];
      jest.spyOn(wineRepository, 'findAll').mockResolvedValue(wines);

      const result = await wineService.getAllWines();

      expect(result).toEqual(wines);
      expect(wineRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWineById', () => {
    it('should return a wine by its ID', async () => {
      const wine: Wine = {
        id: 1,
        name: 'Mock Wine',
        description: 'Mock description',
        year: 2022,
        type: 'Red',
        vintage: 1,
        price: 19.99,
        wineTastings: [],
      };

      jest.spyOn(wineRepository, 'findById').mockResolvedValue(wine);

      const result = await wineService.getWineById(wine.id);

      expect(result).toEqual(wine);
      expect(wineRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if wine is not found', async () => {
      jest.spyOn(wineRepository, 'findById').mockResolvedValue(undefined);

      await expect(wineService.getWineById(1)).rejects.toThrowError(
        NotFoundException,
      );
      expect(wineRepository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('createWine', () => {
    it('should create a new wine', async () => {
      const createWineDto: CreateWineDto = {
        name: 'Sample Wine',
        description: 'Sample description',
        year: 2022,
        type: 'Red',
        vintage: 1,
        price: 29.99,
      };

      const wine = new Wine();
      Object.assign(wine, createWineDto);

      jest.spyOn(wineRepository, 'create').mockResolvedValue(wine);

      const result = await wineService.createWine(createWineDto);

      expect(result).toEqual(wine);
      expect(wineRepository.create).toHaveBeenCalledWith(wine);
    });
  });

  describe('updateWine', () => {
    it('should update a wine', async () => {
      const updateWineDto: UpdateWineDto = {
        id: 1,
        name: 'Updated Wine',
        description: 'Updated description',
        year: 2023,
        type: 'White',
        vintage: 2,
        price: 39.99,
      };

      const existingWine: Wine = {
        id: 1,
        name: 'Existing Wine',
        description: 'Existing description',
        year: 2021,
        type: 'Red',
        vintage: 1,
        price: 29.99,
        wineTastings: [],
      };

      const updatedWine: Wine = {
        ...existingWine,
        ...updateWineDto,
      };

      jest.spyOn(wineRepository, 'findById').mockResolvedValue(existingWine);
      jest.spyOn(wineRepository, 'update').mockResolvedValue(updatedWine);

      let result = await wineService.updateWine(updateWineDto);
      result = { ...result, wineTastings: [] };

      expect(result).toEqual(updatedWine);
      expect(wineRepository.findById).toHaveBeenCalledWith(existingWine.id);
      expect(wineRepository.update).toHaveBeenCalledWith(updateWineDto);
    });

    it('should throw NotFoundException if wine is not found', async () => {
      const updateWineDto: UpdateWineDto = {
        id: 1,
        name: 'Updated Wine',
        description: 'Updated description',
        year: 2023,
        type: 'White',
        vintage: 2,
        price: 39.99,
      };

      const existingWine: Wine = {
        id: 1,
        name: 'Existing Wine',
        description: 'Existing description',
        year: 2021,
        type: 'Red',
        vintage: 1,
        price: 29.99,
        wineTastings: [],
      };

      jest.spyOn(wineRepository, 'findById').mockResolvedValue(existingWine);
      jest.spyOn(wineRepository, 'findById').mockResolvedValue(undefined);

      await expect(wineService.updateWine(updateWineDto)).rejects.toThrowError(
        NotFoundException,
      );

      expect(wineRepository.findById).toHaveBeenCalledWith(1);
      expect(wineRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteWine', () => {
    it('should delete a wine', async () => {
      const id = 1;

      jest.spyOn(wineRepository, 'delete').mockResolvedValue(undefined);

      await wineService.deleteWine(id);

      expect(wineRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
