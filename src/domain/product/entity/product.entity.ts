import Entity from "src/core/entities/entity.generic";
import Identity from "src/core/entities/identity.generic";
import Price from "src/core/value-object/price";
import { Optional } from "src/utils/types/optional.types";

type ProductType = {
    name: string;
    price: Price;
    category: string;
    image: string;
    promotion: boolean;
}

export default class Product extends Entity<ProductType> {
    static create(data: Optional<ProductType, 'image'>, id?: Identity): Product {
        return new Product(
            {
                ...data,
                price: Price.create(data.price.value),
                image: data.image ?? 'no image'
            },
            id
        );
    }

    get name(): string {
        return this.attributes.name;
    }

    get price(): Price {
        return this.attributes.price;
    }

    get category(): string {
        return this.attributes.category;
    }

    get image(): string {
        return this.attributes.image;
    }

    get promotion(): boolean {
        return this.attributes.promotion;
    }

    set name(name: string) {
        this.attributes.name = name;
    }

    set price(price: Price) {
        this.attributes.price = price;
    }

    set category(category: string) {
        this.attributes.category = category;
    }

    set image(image: string) {
        this.attributes.image = image;
    }

    set promotion(promotion: boolean) {
        this.attributes.promotion = promotion;
    }
}