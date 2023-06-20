import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { UserService } from 'src/shared/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get()
  hello() {
    return 'hello user';
  }
  @Get('login')
  form() {
    return 'Use postman to post email and password';
  }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    console.log(user);
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);

    return {
      user,
      token,
    };
  }

  @Get('register')
  form1() {
    return 'Use postman to post Name, Email and Password';
  }
  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);

    return {
      user,
      token,
    };
  }
}
