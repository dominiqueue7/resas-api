import { Module } from '@nestjs/common';
import { EstateTransactionModule } from './modules/estate-transaction.module';

@Module({
  imports: [EstateTransactionModule],
})
export class AppModule {}
