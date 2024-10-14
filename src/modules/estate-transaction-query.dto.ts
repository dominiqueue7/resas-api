import { IsInt, Min, Max, IsIn, Validate } from 'class-validator';
import { CityCodeValidator } from './city-code.validator';

export class EstateTransactionQueryDto {
  @IsInt()
  @Min(2009)
  @Max(2021)
  year: number;

  @IsInt()
  @Min(1)
  @Max(47)
  prefCode: number;

  @IsInt()
  @Validate(CityCodeValidator)
  cityCode: number;

  @IsIn([1, 2, 3, 4, 5])
  displayType: number;
}
