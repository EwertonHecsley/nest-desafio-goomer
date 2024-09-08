import { Injectable } from "@nestjs/common";
import Product from "src/domain/product/entity/product.entity";
import { ProductRepository } from "src/domain/product/repository/product.repository";
import { PrismaService } from "../prisma/prisma.service";
import { ProductPrismaMapper } from "../prisma/mappers/product.prisma.mapper";

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async create(product: Product): Promise<Product> {
        const data = ProductPrismaMapper.toDatabase(product);

        const productData = await this.prismaService.product.create({ data });

        return ProductPrismaMapper.toDomain(productData);
    }

    async listAll(): Promise<Product[]> {
        const products = await this.prismaService.product.findMany();

        return products.map((element) => {
            return ProductPrismaMapper.toDomain(element);
        });
    }
}