import { Either, left, right } from "src/errors/either/either";
import Product from "../entity/product.entity";
import { ProductRepository } from "../repository/product.repository";
import { HttpException } from "src/errors/generic.httpException";

type Request = {
    id: string;
    product: Product;
}

type Response = Either<HttpException, Product>

export class UpdateProduct {
    constructor(private productRepository: ProductRepository) { }

    async execute(data: Request): Promise<Response> {
        const { id, product } = data;
        const productUpdate = await this.productRepository.update(id, product);

        if (!productUpdate) {
            return left(new HttpException(404, "Product Not Found"));
        }

        return right(productUpdate);
    }
}