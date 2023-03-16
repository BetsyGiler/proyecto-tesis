import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  create(createProductDto: CreateProductDto) {
    const id = uuidv4();
    const product = this.productRepository.create({
      ...createProductDto,
      id,
    });

    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOne({
      where: {
        id,
      }
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    // find the product 
    const productExists = await this.productRepository.findOne({
      where: {
        id,
      }
    });

    if (!productExists) {
      throw new BadRequestException({
        error: 'El producto no existe',
      });
    }

    const product = this.productRepository.create({
      ...productExists,
      ...updateProductDto,
    });


    const updated = await this.productRepository.update(id, product);

    if (updated.affected < 1) {
      throw new BadRequestException({
        error: 'El usuario no existe',
      });
    }

    return { updated: true };

  }
}
