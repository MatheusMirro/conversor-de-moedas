import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import axios from 'axios';
import { MessagesCurrencyFailed } from 'src/helpers/message.helper.users';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  async convertCurrency(amount: number, to: string, from: string, id: number) {
    const USER_TOKEN = process.env.MY_TOKEN;

    const instance = axios.create({
      headers: { apikey: USER_TOKEN },
      method: 'GET',
    });
    instance
      .get(
        `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      )

      .then(async (response) => {
        const user = await this.prisma.user.findFirst({
          where: {
            id: id,
          },
        });

        if (!user) {
          throw new NotFoundException(
            MessagesCurrencyFailed.LOGGED_IN_FAILED,
            HttpStatus.NOT_FOUND.toString(),
          );
        }

        const responseData = response.data;

        console.log(responseData);

        const createdCurrency = await this.prisma.currency.create({
          data: {
            baseCurrency: responseData.query?.from,
            finalCurrency: responseData.query?.to,
            finalAmount: responseData.result,
            conversionRate: responseData.info?.rate,
            createdAtConverted: responseData.date,
            amount: Number(amount),
            User: {
              connect: {
                id: user.id,
              },
            },
          },
        });
        return createdCurrency;
      });
  }
}
