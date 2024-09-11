import { Either, left, right } from "src/errors/either/either";
import { ProductRepository } from "../repository/product.repository";
import { HttpException } from "src/errors/generic.httpException";
import Price from "src/core/value-object/price";
import Product from "../entity/product.entity";
import { UpdateProductDto } from "../dto/update.product.dto";

type Request = {
    id: string;
    product: UpdateProductDto;
}

type Response = Either<HttpException, Product>

export class UpdateProduct {
    constructor(private productRepository: ProductRepository) { }

    async execute(data: Request): Promise<Response> {
        const { id, product } = data;

        const existingProduct = await this.productRepository.findById(id);

        if (!existingProduct) {
            return left(new HttpException(404, "Product Not Found"));
        }

        if (product.name !== undefined) {
            existingProduct.name = product.name;
        }
        if (product.price !== undefined) {
            existingProduct.price = Price.create(product.price);
        }
        if (product.category !== undefined) {
            existingProduct.category = product.category;
        }
        if (product.image !== undefined) {
            existingProduct.image = product.image;
        }
        if (product.promotion !== undefined) {
            existingProduct.promotion = product.promotion;
        }

        const productUpdate = await this.productRepository.update(id, existingProduct);

        if (!productUpdate) {
            return left(new HttpException(404, "Product Not Found"));
        }

        return right(productUpdate);
    }
}