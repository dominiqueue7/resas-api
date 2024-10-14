import { Test, TestingModule } from '@nestjs/testing';
import { GetEstateTransactionUseCase } from './get-estate-transaction.usecase';
import { ESTATE_TRANSACTION_REPOSITORY } from './estate-transaction.repository';
import { EstateTransaction } from './estate-transaction.entity';

describe('GetEstateTransactionUseCase', () => {
  let useCase: GetEstateTransactionUseCase;
  let repository: jest.Mocked<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetEstateTransactionUseCase,
        {
          provide: ESTATE_TRANSACTION_REPOSITORY,
          useValue: {
            getEstateTransaction: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetEstateTransactionUseCase>(
      GetEstateTransactionUseCase,
    );
    repository = module.get(ESTATE_TRANSACTION_REPOSITORY);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call repository.getEstateTransaction with correct parameters', async () => {
      const mockResult: EstateTransaction = {
        prefCode: '13',
        prefName: 'Tokyo',
        cityCode: '13101',
        cityName: 'Chiyoda',
        displayType: '1',
        years: [{ year: 2020, value: 1000000 }],
      };

      repository.getEstateTransaction.mockResolvedValue(mockResult);

      const result = await useCase.execute(2020, 13, 13101, 1);

      expect(repository.getEstateTransaction).toHaveBeenCalledWith(
        2020,
        13,
        13101,
        1,
      );
      expect(result).toEqual(mockResult);
    });

    it('should throw an error if repository throws an error', async () => {
      const error = new Error('Repository error');
      repository.getEstateTransaction.mockRejectedValue(error);

      await expect(useCase.execute(2020, 13, 13101, 1)).rejects.toThrow(
        'Repository error',
      );
    });
  });
});
