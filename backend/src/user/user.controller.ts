import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtStrategyOutput } from 'src/auth/interfaces/strategy-output.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async findAll() {
    return await this.userService.findAllClients();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  async update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {

    const { session } = request['user'] as JwtStrategyOutput;

    return await this.userService.update(session, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
