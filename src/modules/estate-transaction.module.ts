import { Module } from '@nestjs/common';
import { EstateTransactionController } from './estate-transaction.controller';
import { GetEstateTransactionUseCase } from './get-estate-transaction.usecase';
import { ResasApiService } from './resas-api.service';
import { ESTATE_TRANSACTION_REPOSITORY } from './estate-transaction.repository';

@Module({
  controllers: [EstateTransactionController],
  providers: [
    GetEstateTransactionUseCase,
    {
      provide: ESTATE_TRANSACTION_REPOSITORY,
      useClass: ResasApiService,
    },
  ],
})
export class EstateTransactionModule {}
