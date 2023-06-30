import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { SessionService } from './session.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.guard';
import { UserService } from 'src/user/user.service';
import { Session } from './entities/session.entity';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { UserModule } from 'src/user/user.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

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
    UserService,
    SessionService,
    AuthService,
    AdminGuard,
    ClientGuard,
    JwtStrategy,
    JwtAuthGuard,
  ],
  imports: [
    TypeOrmModule.forFeature([Session, User, Session]),
    jwtRegistration,
    UserModule,
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
