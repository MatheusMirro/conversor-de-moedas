import { Prisma } from '@prisma/client';
export class Currency implements Prisma.CurrencyUncheckedCreateInput {
  id?: number;
  baseCurrency: string;
  finalCurrency: string;
  amount: number;
  finalAmount: number;
  conversionRate: number;
  createdAtConverted: string;
  userId?: number;
  createdAt?: string | Date;
}
