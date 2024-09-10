import Product from "../entity/product.entity";

export abstract class ProductRepository {
    abstract create(product: Product): Promise<Product>;
    abstract listAll(): Promise<Product[]>;
    abstract findById(id: string): Promise<Product | null>;
    abstract destroy(id: string): Promise<void>;
}