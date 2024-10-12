import { Injectable, Inject } from '@nestjs/common';
import {
  EstateTransactionRepository,
  ESTATE_TRANSACTION_REPOSITORY,
} from './estate-transaction.repository';
import { EstateTransaction } from './estate-transaction.entity';

@Injectable()
export class GetEstateTransactionUseCase {
  constructor(
    @Inject(ESTATE_TRANSACTION_REPOSITORY)
    private readonly estateTransactionRepository: EstateTransactionRepository,
  ) {}

  async execute(
    year: number,
    prefCode: number,
    cityCode: number,
    displayType: number,
  ): Promise<EstateTransaction> {
    return this.estateTransactionRepository.getEstateTransaction(
      year,
      prefCode,
      cityCode,
      displayType,
    );
  }
}
