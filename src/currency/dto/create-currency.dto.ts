import { Currency } from '../entities/currency.entity';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCurrencyDto extends Currency {
  id?: number;
  @IsNotEmpty()
  @IsString()
  baseCurrency: string;
  @IsNotEmpty()
  @IsString()
  finalCurrency: string;
  @IsNotEmpty()
  @IsInt()
  amount: number;
  @IsNotEmpty()
  @IsInt()
  finalAmount: number;
  createdAt?: string | Date;
}
