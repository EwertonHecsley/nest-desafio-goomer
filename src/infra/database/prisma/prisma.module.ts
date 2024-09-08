import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductRepository } from 'src/domain/product/repository/product.repository';
import { ProductPrismaRepository } from '../repositories/product.prisma.repository';

@Module({
    providers: [
        PrismaService,
        { provide: ProductRepository, useClass: ProductPrismaRepository }
    ],
    exports: [PrismaService, ProductRepository]
})
export class PrismaModule { }
