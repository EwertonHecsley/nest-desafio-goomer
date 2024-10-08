import { Module } from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { ProductController } from './controllers/product.controller';
import { ListProducts } from './use-case/list.products';
import { CreateProduct } from './use-case/create.product';
import { FindById } from './use-case/findById.product';
import { DeleteProduct } from './use-case/delete.product';
import { UpdateProduct } from './use-case/update.product';

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
    },
    {
      provide: CreateProduct,
      useFactory: (
        productRepository: ProductRepository
      ) => {
        return new CreateProduct(productRepository);
      },
      inject: [ProductRepository]
    },
    {
      provide: FindById,
      useFactory: (
        productRepository: ProductRepository
      ) => {
        return new FindById(productRepository);
      },
      inject: [ProductRepository]
    },
    {
      provide: DeleteProduct,
      useFactory: (
        productRepository: ProductRepository
      ) => {
        return new DeleteProduct(productRepository);
      },
      inject: [ProductRepository]
    },
    {
      provide: UpdateProduct,
      useFactory: (
        productRepository: ProductRepository
      ) => {
        return new UpdateProduct(productRepository);
      },
      inject: [ProductRepository]
    }
  ],
  controllers: [ProductController]
})
export class ProductModule { }
