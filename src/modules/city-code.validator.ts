import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CityDataService } from './city-data.service';

@ValidatorConstraint({ name: 'cityCodeValidator', async: true })
@Injectable()
export class CityCodeValidator implements ValidatorConstraintInterface {
  constructor(private cityDataService: CityDataService) {}

  async validate(cityCode: number, args: ValidationArguments) {
    const { prefCode } = args.object as any;
    const validCityCodes = await this.cityDataService.getCities(prefCode);
    return validCityCodes.includes(cityCode.toString());
  }

  defaultMessage(args: ValidationArguments) {
    return `City code ${args.value} is not valid for the given prefecture`;
  }
}
