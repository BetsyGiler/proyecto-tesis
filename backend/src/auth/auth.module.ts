import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { SessionService } from './session.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { Session } from './entities/session.entity';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserService } from 'src/user/user.service';

const jwtRegistration = JwtModule.registerAsync({
  imports: [],
  useFactory: () => ({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
  }),
});

@Module({
  controllers: [AuthController],
  providers: [
    SessionService,
    AuthService,
    AdminGuard,
    ClientGuard,
    JwtStrategy,
    JwtAuthGuard,
    UserService,
  ],
  imports: [
    TypeOrmModule.forFeature([Session, User, Session]),
    jwtRegistration,
    NestjsFormDataModule,
  ],
  exports: [
    jwtRegistration,
    JwtAuthGuard,
    AdminGuard,
    ClientGuard,
  ]
})
export class AuthModule { }
