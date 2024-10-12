import { EstateTransaction } from './estate-transaction.entity';

export const ESTATE_TRANSACTION_REPOSITORY = 'ESTATE_TRANSACTION_REPOSITORY';

export interface EstateTransactionRepository {
  getEstateTransaction(
    year: number,
    prefCode: number,
    cityCode: number,
    displayType: number,
  ): Promise<EstateTransaction>;
}
