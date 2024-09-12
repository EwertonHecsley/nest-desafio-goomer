import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductRepository } from 'src/domain/product/repository/product.repository';
import { ProductPrismaRepository } from '../repositories/product.prisma.repository';
import { RestaurantRepository } from 'src/domain/restaurant/repository/restaurant.repository';
import { RestaurantPrismaRepository } from '../repositories/restaurant.prisma.repository';

@Module({
    providers: [
        PrismaService,
        { provide: ProductRepository, useClass: ProductPrismaRepository },
        { provide: RestaurantRepository, useClass: RestaurantPrismaRepository }
    ],
    exports: [PrismaService, ProductRepository, RestaurantRepository]
})
export class PrismaModule { }
