import { HttpException } from "src/errors/generic.httpException";
import { ProductRepository } from "../repository/product.repository";
import { Either, left, right } from "src/errors/either/either";

type Request = {
    id: string
}

type Response = void | HttpException

export class DeleteProduct {
    constructor(private productRepository: ProductRepository) { }

    async execute({ id }: Request): Promise<Response> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new HttpException(404, "Product Not Found");
        }

        return await this.productRepository.destroy(id);
    }
}