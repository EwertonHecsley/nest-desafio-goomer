import { HttpException } from "src/errors/generic.httpException";
import { ProductRepository } from "../repository/product.repository";
import { Either, left, right } from "src/errors/either/either";

type Request = {
    id: string
}

type Response = Either<HttpException, boolean>

export class DeleteProduct {
    constructor(private productRepository: ProductRepository) { }

    async execute({ id }: Request): Promise<Response> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            return left(new HttpException(404, "Product Not Found"));
        }

        await this.productRepository.destroy(id);

        return right(true);
    }
}