import Product from "src/domain/product/entity/product.entity";

export class ProductPresenter {
    static toHttp(entity: Product) {
        return {
            id: entity.id.valueId,
            name: entity.name,
            price: entity.price.value,
            category: entity.category,
            image: entity.image,
            promotion: entity.promotion
        };
    }

}