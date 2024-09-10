import { Either, left, right } from "src/errors/either/either";
import Product from "../entity/product.entity";
import { ProductRepository } from "../repository/product.repository";
import { NotFoundError } from "src/errors/custom/notFound.error";

type Request = {
    id: string;
}

type Response = Either<NotFoundError, Product>

export class FindById {
    constructor(private productRepository: ProductRepository) { }

    async execute({ id }: Request): Promise<Response> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            return left(new NotFoundError());
        }

        return right(product);
    }
}