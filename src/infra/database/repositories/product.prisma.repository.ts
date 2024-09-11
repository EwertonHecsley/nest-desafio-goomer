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

    async destroy(id: string): Promise<void | null> {
        const productDatabase = await this.prismaService.product.findFirst({ where: { id } });

        if (!productDatabase) {
            return null;
        }

        await this.prismaService.product.delete({ where: { id } });
    }

    async update(id: string, product: Product): Promise<Product | null> {
        const productDatabase = await this.prismaService.product.findFirst({ where: { id } });

        if (!productDatabase) {
            return null;
        }

        const productUpdated = await this.prismaService.product.update(
            {
                where: { id },
                data: ProductPrismaMapper.toDatabase(product)
            }
        )

        return ProductPrismaMapper.toDomain(productUpdated);
    }
}