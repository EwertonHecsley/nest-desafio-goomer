import { Product as ProductDatabase } from "@prisma/client";
import Identity from "src/core/entities/identity.generic";
import Price from "src/core/value-object/price";
import Product from "src/domain/product/entity/product.entity";

export class ProductPrismaMapper {
    static toDomain(product: ProductDatabase): Product {
        return Product.create(
            {
                name: product.name,
                price: Price.create(product.price),
                category: product.category,
                image: product.image,
                promotion: product.promotion
            },
            new Identity(product.id)
        )
    }

    static toDatabase(product: Product): ProductDatabase {
        return {
            id: product.id.valueId,
            name: product.name,
            price: product.price.value,
            category: product.category,
            image: product.image,
            promotion: product.promotion
        }
    }
}