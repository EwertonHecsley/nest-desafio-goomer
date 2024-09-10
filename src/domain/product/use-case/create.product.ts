import { Either, left, right } from "src/errors/either/either";
import { ProductRepository } from "../repository/product.repository";
import Product from "../entity/product.entity";
import Price from "src/core/value-object/price";
import { BadRequestException } from "@nestjs/common";

type Request = {
    name: string;
    price: number;
    category: string;
    image: string;
    promotion: boolean;
}

type Response = Either<BadRequestException, Product>

export class CreateProduct {
    constructor(private productRepository: ProductRepository) { }

    async execute({ name, price, category, image, promotion }: Request): Promise<Response> {

        const product = Product.create(
            {
                name,
                price: Price.create(price),
                category,
                image,
                promotion
            }
        )

        if (!product) {
            return left(new BadRequestException())
        }

        await this.productRepository.create(product);

        return right(product);
    }
}