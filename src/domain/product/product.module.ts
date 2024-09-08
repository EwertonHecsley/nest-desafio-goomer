import { Module } from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { ProductController } from './controllers/list.product.controller';
import { ListProducts } from './use-case/list.products';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: ListProducts,
      useFactory: (
        productRepository: ProductRepository
      ) => {
        return new ListProducts(productRepository);
      },
      inject: [ProductRepository]
    }
  ],
  controllers: [ProductController]
})
export class ProductModule { }
