import { Injectable } from "@nestjs/common";
import Product from "src/domain/product/entity/product.entity";
import { ProductRepository } from "src/domain/product/repository/product.repository";
import { PrismaService } from "../prisma/prisma.service";
import { ProductPrismaMapper } from "../prisma/mappers/product.prisma.mapper";

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
    constructor(private prismaService: PrismaService) { }

    async create(product: Product): Promise<Product> {
        const data = ProductPrismaMapper.toDatabase(product);

        const productData = await this.prismaService.product.create({ data });

        return ProductPrismaMapper.toDomain(productData);
    }

    async listAll(): Promise<Product[]> {
        const productsDatabase = await this.prismaService.product.findMany();

        return productsDatabase.map(ProductPrismaMapper.toDomain);
    }

    async findById(id: string): Promise<Product | null> {
        const productDatabase = await this.prismaService.product.findUnique({ where: { id } });

        if (!productDatabase) {
            return null;
        }

        return ProductPrismaMapper.toDomain(productDatabase);
    }
}