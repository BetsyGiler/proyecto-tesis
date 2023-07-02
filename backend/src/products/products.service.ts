import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productsService: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    return await this.productsService.save(createProductDto);
  }

  async findAll() {
    return await this.productsService.find({
      where: {
        isActive: true
      }
    });
  }

  async findOne(id: string) {
    return await this.productsService.findOne({
      where: {
        id: id,
        isActive: true
      }
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const found = await this.productsService.findOne({
      where: {
        id: id,
        isActive: true
      }
    });

    if (!found) {
      throw new NotFoundException('Producto no existe');
    }

    return await this.productsService.save({ id, ...updateProductDto });
  }

  async remove(id: string) {
    const found = await this.productsService.findOne({
      where: {
        id: id,
        isActive: true
      }
    });

    if (!found) {
      throw new NotFoundException('Producto no existe');
    }
    return await this.productsService.update(id, { isActive: false });
  }
}
