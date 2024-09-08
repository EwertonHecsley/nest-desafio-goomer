import { Either, right } from "src/errors/either/either";
import { ProductRepository } from "../repository/product.repository";
import Product from "../entity/product.entity";

type Response = Either<null, Product[]>

export class ListProducts {
    constructor(private productRepository: ProductRepository) { }

    async execute(): Promise<Response> {
        const listProduct = await this.productRepository.listAll();

        return right(listProduct);
    }
}