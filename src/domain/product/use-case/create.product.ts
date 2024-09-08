import { Either, right } from "src/errors/either/either";
import { ProductRepository } from "../repository/product.repository";
import Product from "../entity/product.entity";
import Price from "src/core/value-object/price";

type Request = {
    name: string;
    price: number;
    category: string;
    image: string;
    promotion: boolean;
}

type Response = Either<null, Product>

export class CreateProduct {
    constructor(private productRepository: ProductRepository) { }

    async execute(data: Request): Promise<Response> {
        const { name, price, category, image, promotion } = data;

        const product = Product.create(
            {
                name,
                price: Price.create(price),
                category,
                image,
                promotion
            }
        )

        await this.productRepository.create(product);

        return right(product);
    }
}