import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetEstateTransactionUseCase } from './get-estate-transaction.usecase';
import { EstateTransactionQueryDto } from './estate-transaction-query.dto';
import { EstateTransaction } from './estate-transaction.entity';

@Controller('api/v1/townPlanning/estateTransaction')
export class EstateTransactionController {
  constructor(
    private readonly getEstateTransactionUseCase: GetEstateTransactionUseCase,
  ) {}

  @Get('bar')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async getEstateTransaction(
    @Query() query: EstateTransactionQueryDto,
  ): Promise<EstateTransaction> {
    const { year, prefCode, cityCode, displayType } = query;
    return this.getEstateTransactionUseCase.execute(
      year,
      prefCode,
      cityCode,
      displayType,
    );
  }
}
