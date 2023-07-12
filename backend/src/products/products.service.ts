import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import environment from 'src/config/env.config';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 } from 'uuid';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productsService: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {

    const mainImage = createProductDto.imagenPrincipal;
    const imageDir = environment.fileStorageDir;

    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }

    let imageUrl: string | undefined;

    if (mainImage) {

      const extension = mainImage.originalName.split('.').pop();
      const fileName = `${v4()}.${extension}`;
      fs.writeFileSync(`${imageDir}${fileName}`, mainImage.buffer);

      // extracting the host & port being used
      const host = environment.apiHost;
      const port = environment.apiPort;

      const imageProtocol = host === 'localhost' ? 'http' : 'https';
      const imageHost = `www.${host}:${port}`;
      const imageEndpoint = `${imageProtocol}://${imageHost}/api/images/${fileName}`;

      imageUrl = imageEndpoint;
      console.log("Image url", imageUrl);
    }

    const createdProduct = await this.productsService.save({
      ...createProductDto,
      imagenPrincipalUrl: imageUrl
    });

    if (createdProduct) {
      return await this.productsService.findOne({
        where: {
          id: createdProduct.id
        },
      });
    }
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
