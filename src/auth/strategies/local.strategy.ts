import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UnauthorizedError } from 'src/helpers/errors/unauthorized.error';
import { MessagesUserFailed } from 'src/helpers/message.helper.users';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);

    if (!user)
      throw new UnauthorizedError(
        MessagesUserFailed.PASSWORD_OR_USERNAME_INVALID,
      );

    return user;
  }
}
