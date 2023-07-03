import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, UserService],
  imports: [
    TypeOrmModule.forFeature([Product, User]),
    AuthModule,
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
})
export class ProductsModule { }
