import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { joiValidationSchema } from './config/joi.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { ProvidersModule } from './providers/providers.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { ServicesModule } from './services/services.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { OfertasModule } from './ofertas/ofertas.module';
import { CitasModule } from './citas/citas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema: joiValidationSchema }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    ProvidersModule,
    NotificationsModule,
    ProductsModule,
    ImagesModule,
    ServicesModule,
    PedidosModule,
    OfertasModule,
    CitasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
