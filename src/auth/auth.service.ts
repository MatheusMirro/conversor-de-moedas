import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UserToken } from './models/UserToken';
import { UserPayload } from './models/UserPayload';
import { UnauthorizedError } from 'src/helpers/errors/unauthorized.error';
import { MessagesUserFailed } from 'src/helpers/message.helper.users';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      username: user.username,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
      user: user,
    };
  }

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      console.log(result);
      return result;
    }
    return null;
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new UnauthorizedError(
      MessagesUserFailed.PASSWORD_OR_USERNAME_INVALID,
    );
  }
}
