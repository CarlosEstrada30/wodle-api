import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity';
import { UsersService } from '../users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this.usersService.getUser({ username, password });

    return user ?? null;
  }

  async loginWithCredentials(user: User) {
    const payload = { username: user.username, email: user.email, token: user.token };

    return {
      username: user.username,
      email: user.email,
      token: user.token,
      access_token: this.jwtService.sign(payload),
    //   expiredAt: Date.now() + 60000,
    };
  }
}