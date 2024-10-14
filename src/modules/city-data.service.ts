import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

@Injectable()
export class CityDataService {
  private readonly apiKey = '6pA0ritQTXfbYyVWNb23tfv0AeYXFPDpARHn4F3v';
  private readonly baseUrl = 'https://opendata.resas-portal.go.jp/api/v1';
  private readonly logger = new Logger(CityDataService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCities(prefCode: number): Promise<string[]> {
    const cacheKey = `cities_${prefCode}`;
    const cachedCities = await this.cacheManager.get<string[]>(cacheKey);

    if (cachedCities) {
      return cachedCities;
    }

    const url = `${this.baseUrl}/cities`;
    const response = await axios.get(url, {
      params: { prefCode },
      headers: { 'X-API-KEY': this.apiKey },
    });

    const cities = response.data.result.map((city) => city.cityCode);
    await this.cacheManager.set(cacheKey, cities, 86400000);
    this.logger.log(`Cities for prefecture ${prefCode} cached successfully`);

    return cities;
  }
}
