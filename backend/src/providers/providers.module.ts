import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [ProvidersController],
  providers: [
    ProvidersService,
    UserService,
  ],
  imports: [
    TypeOrmModule.forFeature([Provider, User]),
    AuthModule,
  ],
})
export class ProvidersModule { }
