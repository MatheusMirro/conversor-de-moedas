import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get(':id/:to/:from/:amount')
  @UseGuards(JwtAuthGuard)
  async fetchApi(
    @Param('id') id: number,
    @Param('to') to: string,
    @Param('from') from: string,
    @Param('amount') amount: number,
  ) {
    return this.currencyService.convertCurrency(amount, to, from, +id);
  }
}
