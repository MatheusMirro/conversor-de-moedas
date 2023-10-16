import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { MessagesUserFailed } from 'src/helpers/message.helper.users';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    const checkUser = await this.prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (checkUser) {
      throw new BadRequestException(MessagesUserFailed.CREATE_INVALID_USER);
    }

    data.password = await bcrypt.hash(
      data.password,
      Number(process.env.SALT_ROUNDS),
    );

    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
      },
      include: {
        Currency: true,
        _count: true,
      },
    });
    return user;
  }

  async findOne(username: string) {
    const checkUser = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!checkUser) {
      throw new NotFoundException(
        MessagesUserFailed.PASSWORD_OR_USERNAME_INVALID,
      );
    }

    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        Currency: {
          select: {
            amount: true,
            baseCurrency: true,
            conversionRate: true,
            finalAmount: true,
            finalCurrency: true,
            createdAtConverted: true,
            id: true,
          },
        },
      },
    });
    return user;
  }
}
