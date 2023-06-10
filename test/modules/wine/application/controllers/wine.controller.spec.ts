import { Test, TestingModule } from '@nestjs/testing';
import { WineController } from 'src/modules/wine/application/controllers/wine.controller';
import { WineService } from 'src/modules/wine/application/wine.service';

describe('WineController', () => {
  let controller: WineController;
  const mockWineService = {
    getAllWines: jest.fn(),
    getWineById: jest.fn(),
    createWine: jest.fn(),
    updateWine: jest.fn(),
    deleteWine: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WineController],
      providers: [WineService],
    })
      .overrideProvider(WineService)
      .useValue(mockWineService)
      .compile();

    controller = module.get<WineController>(WineController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getWines', () => {
    it('should return all wines', async () => {
      const mockWines = [
        { id: 1, name: 'Wine 1' },
        { id: 2, name: 'Wine 2' },
      ];
      jest.spyOn(mockWineService, 'getAllWines').mockResolvedValue(mockWines);

      const result = await controller.getWines();

      expect(result).toEqual(mockWines);
      expect(mockWineService.getAllWines).toHaveBeenCalled();
    });
  });

  describe('getWine', () => {
    it('should return a specific wine', async () => {
      const wineId = 1;
      const mockWine = { id: wineId, name: 'Wine 1' };
      jest.spyOn(mockWineService, 'getWineById').mockResolvedValue(mockWine);

      const result = await controller.getWine(wineId);

      expect(result).toEqual(mockWine);
      expect(mockWineService.getWineById).toHaveBeenCalledWith(wineId);
    });
  });

  describe('createWine', () => {
    it('should create a new wine', async () => {
      const createWineDto = { name: 'New Wine' };
      const mockCreatedWine = { id: 1, ...createWineDto };
      jest
        .spyOn(mockWineService, 'createWine')
        .mockResolvedValue(mockCreatedWine);

      const result = await controller.createWine(createWineDto);

      expect(result).toEqual(mockCreatedWine);
      expect(mockWineService.createWine).toHaveBeenCalledWith(createWineDto);
    });
  });

  describe('updateWine', () => {
    it('should update an existing wine', async () => {
      const wineId = 1;
      const updateWineDto = { id: wineId, name: 'Updated Wine' };
      jest
        .spyOn(mockWineService, 'updateWine')
        .mockResolvedValue(updateWineDto);

      const result = await controller.updateWine(wineId, updateWineDto);

      expect(result).toEqual(updateWineDto);
      expect(mockWineService.updateWine).toHaveBeenCalledWith(updateWineDto);
    });

    it('should not update wine if IDs do not match', async () => {
      const wineId = 1;
      const updateWineDto = { id: 2, name: 'Updated Wine' };

      const result = await controller.updateWine(wineId, updateWineDto);

      expect(result).toBeUndefined();
      expect(mockWineService.updateWine).not.toHaveBeenCalled();
    });
  });

  describe('deleteWine', () => {
    it('should delete a specific wine', async () => {
      const wineId = 1;
      jest.spyOn(mockWineService, 'deleteWine').mockResolvedValue(true);

      const result = await controller.deleteWine(wineId);

      expect(result).toBe(true);
      expect(mockWineService.deleteWine).toHaveBeenCalledWith(wineId);
    });
  });
});
