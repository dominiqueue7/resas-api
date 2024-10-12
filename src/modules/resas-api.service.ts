import { Injectable } from '@nestjs/common';
import { EstateTransactionRepository } from './estate-transaction.repository';
import { EstateTransaction } from './estate-transaction.entity';
import axios from 'axios';

@Injectable()
export class ResasApiService implements EstateTransactionRepository {
  private readonly apiKey = '6pA0ritQTXfbYyVWNb23tfv0AeYXFPDpARHn4F3v';
  private readonly baseUrl = 'https://opendata.resas-portal.go.jp/api/v1';

  async getEstateTransaction(
    year: number,
    prefCode: number,
    cityCode: number,
    displayType: number,
  ): Promise<EstateTransaction> {
    const url = `${this.baseUrl}/townPlanning/estateTransaction/bar`;
    const params = { year, prefCode, cityCode, displayType };

    try {
      const response = await axios.get(url, {
        params,
        headers: { 'X-API-KEY': this.apiKey },
      });
      return response.data.result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('Unknown ERROR occurred');
      }
    }
  }
}
