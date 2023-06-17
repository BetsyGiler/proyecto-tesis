import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/register.dto';
import { SignInDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.guard';
import { JwtStrategyOutput } from './interfaces/strategy-output.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  async register(@Body() createAuthDto: SignUpDto) {
    return await this.authService.register(createAuthDto);
  }

  @Post('/login')
  async login(@Body() loginDto: SignInDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/check-session')
  async checkSession(@Req() req: Request) {
    const guardOutput = req['user'] as JwtStrategyOutput;

    return await this.authService.checkSession(guardOutput);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Req() req: Request) {
    const guardOutput = req['user'] as JwtStrategyOutput;

    return await this.authService.logout(guardOutput);
  }
}
