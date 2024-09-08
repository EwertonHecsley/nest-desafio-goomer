import Product from "../entity/product.entity";

export abstract class ProductRepository {
    abstract create(product: Product): Promise<Product>;
    abstract listAll(): Promise<Product[]>;
}