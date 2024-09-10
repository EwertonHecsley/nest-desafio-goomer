import { Either, left, right } from "src/errors/either/either";
import Product from "../entity/product.entity";
import { ProductRepository } from "../repository/product.repository";
import { HttpException } from "src/errors/generic.httpException";

type Request = {
    id: string;
}

type Response = Either<HttpException, Product>

export class FindById {
    constructor(private productRepository: ProductRepository) { }

    async execute({ id }: Request): Promise<Response> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            return left(new HttpException(400, "Not Found"));
        }

        return right(product);
    }
}