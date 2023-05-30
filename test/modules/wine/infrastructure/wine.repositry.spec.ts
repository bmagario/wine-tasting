import Wine from 'src/modules/wine/domain/entities/wine.entity';
import { WineRepository } from 'src/modules/wine/infrastructure/repositories/wine.repository';
import { Repository } from 'typeorm';

describe('WineRepository', () => {
  let wineRepository: WineRepository;
  let mockRepository: jest.Mocked<Repository<Wine>>;

  beforeAll(() => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<Repository<Wine>>;

    wineRepository = new WineRepository(mockRepository);
  });

  describe('createWine', () => {
    it('should create a new wine', async () => {
      const wineData: Partial<Wine> = { name: 'Test Wine', year: 2021 };
      const createdWine: Wine = {
        id: 1,
        name: 'Test Wine',
        year: 2021,
        description: '',
        type: '',
        price: 0,
        vintage: 0,
        wineTastings: [],
      };

      mockRepository.create.mockReturnValue(createdWine);
      mockRepository.save.mockResolvedValue(createdWine);

      const result = await wineRepository.create(wineData);

      expect(mockRepository.create).toHaveBeenCalledWith(wineData);
      expect(mockRepository.save).toHaveBeenCalledWith(createdWine);
      expect(result).toEqual(createdWine);
    });
  });

  describe('findAll', () => {
    it('should return all wines', async () => {
      const wines: Wine[] = [];

      mockRepository.find.mockResolvedValue(wines);

      const result = await wineRepository.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(wines);
    });
  });

  describe('findById', () => {
    it('should return the wine with the given id', async () => {
      const wineId = 1;
      const wine: Wine = {
        id: wineId,
        name: 'Test Wine',
        year: 2021,
        description: '',
        type: '',
        price: 0,
        vintage: 0,
        wineTastings: [],
      };

      mockRepository.findOne.mockResolvedValue(wine);

      const result = await wineRepository.findById(wineId);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: wineId },
      });
      expect(result).toEqual(wine);
    });

    it('should return undefined if wine is not found', async () => {
      const wineId = 1;

      mockRepository.findOne.mockResolvedValue(undefined);

      const result = await wineRepository.findById(wineId);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: wineId },
      });
      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update the wine with the given data', async () => {
      const updatedWineData: Partial<Wine> = {
        id: 1,
        name: 'Updated Wine',
        year: 2022,
      };
      const updatedWine: Wine = {
        id: 1,
        name: 'Updated Wine',
        year: 2022,
        description: '',
        type: '',
        price: 0,
        vintage: 0,
        wineTastings: [],
      };

      mockRepository.update.mockResolvedValue(undefined);
      mockRepository.findOne.mockResolvedValue(updatedWine);

      const result = await wineRepository.update(updatedWineData);

      expect(mockRepository.update).toHaveBeenCalledWith(
        updatedWineData.id,
        updatedWineData,
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: updatedWineData.id },
      });
      expect(result).toEqual(updatedWine);
    });

    it('should return undefined if wine is not found', async () => {
      const updatedWineData: Partial<Wine> = {
        id: 1,
        name: 'Updated Wine',
        year: 2022,
      };

      mockRepository.update.mockResolvedValue(undefined);
      mockRepository.findOne.mockResolvedValue(undefined);

      const result = await wineRepository.update(updatedWineData);

      expect(mockRepository.update).toHaveBeenCalledWith(
        updatedWineData.id,
        updatedWineData,
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: updatedWineData.id },
      });
      expect(result).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete the wine with the given id', async () => {
      const wineId = 1;

      mockRepository.delete.mockResolvedValue(undefined);

      await wineRepository.delete(wineId);

      expect(mockRepository.delete).toHaveBeenCalledWith(wineId);
    });
  });
});
