import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('email', email);
    const user = await this.userService.findOne(email);
    console.log('user', user);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, email } = user;
      return { _id, email };
    }
    return null;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const payload = await this.validateUser(
      loginAuthDto.email,
      loginAuthDto.password,
    );
    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
