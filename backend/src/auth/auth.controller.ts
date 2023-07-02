import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/login.dto';
import { JwtStrategyOutput } from './interfaces/strategy-output.interface';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/registrar')
  @FormDataRequest({ storage: MemoryStoredFile })
  async register(@Body() createAuthDto: CreateUserDto) {
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
