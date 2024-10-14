import { Module } from '@nestjs/common';
import { EstateTransactionController } from './estate-transaction.controller';
import { GetEstateTransactionUseCase } from './get-estate-transaction.usecase';
import { ResasApiService } from './resas-api.service';
import { ESTATE_TRANSACTION_REPOSITORY } from './estate-transaction.repository';
import { CityDataService } from './city-data.service';
import { CityCodeValidator } from './city-code.validator';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [EstateTransactionController],
  providers: [
    GetEstateTransactionUseCase,
    CityDataService,
    CityCodeValidator,
    {
      provide: ESTATE_TRANSACTION_REPOSITORY,
      useClass: ResasApiService,
    },
  ],
})
export class EstateTransactionModule {}
