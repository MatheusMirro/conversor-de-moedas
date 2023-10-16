import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { PrismaService } from 'src/prisma.service';
import { Axios } from 'axios';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, PrismaService, Axios],
})
export class CurrencyModule {}
