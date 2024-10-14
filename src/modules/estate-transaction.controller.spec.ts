import { Test, TestingModule } from '@nestjs/testing';
import { EstateTransactionController } from './estate-transaction.controller';
import { GetEstateTransactionUseCase } from './get-estate-transaction.usecase';
import { EstateTransactionQueryDto } from './estate-transaction-query.dto';
import { EstateTransaction } from './estate-transaction.entity';

describe('EstateTransactionController', () => {
  let controller: EstateTransactionController;
  let useCase: GetEstateTransactionUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstateTransactionController],
      providers: [
        {
          provide: GetEstateTransactionUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EstateTransactionController>(
      EstateTransactionController,
    );
    useCase = module.get<GetEstateTransactionUseCase>(
      GetEstateTransactionUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getEstateTransaction', () => {
    it('should call useCase.execute with correct parameters', async () => {
      const query: EstateTransactionQueryDto = {
        year: 2020,
        prefCode: 13,
        cityCode: 13101,
        displayType: 1,
      };

      const mockResult: EstateTransaction = {
        prefCode: '13',
        prefName: '東京都',
        cityCode: '13101',
        cityName: '千代田区',
        displayType: '1',
        years: [{ year: 2020, value: 1488372 }],
      };

      jest.spyOn(useCase, 'execute').mockResolvedValue(mockResult);

      const result = await controller.getEstateTransaction(query);

      expect(useCase.execute).toHaveBeenCalledWith(2020, 13, 13101, 1);
      expect(result).toEqual(mockResult);
    });
  });
});
