import Entity from "src/core/entities/entity.generic";
import Identity from "src/core/entities/identity.generic";
import { Optional } from "src/utils/types/optional.types";

type ProductType = {
    name: string;
    price: number;
    category: string;
    image: string;
    promotion: boolean;
}

export default class Product extends Entity<ProductType> {
    static create(data: Optional<ProductType, 'image'>, id?: Identity) {
        return new Product(
            {
                ...data,
                image: data.image ?? 'no image'
            }
        ), id
    }

    get name(): string {
        return this.attibutes.name;
    }

    get price(): number {
        return this.attibutes.price;
    }

    get category(): string {
        return this.attibutes.category;
    }

    get image(): string {
        return this.attibutes.image;
    }

    get promotion(): boolean {
        return this.attibutes.promotion;
    }

    set name(name: string) {
        this.attibutes.name = name;
    }

    set price(price: number) {
        this.attibutes.price = price;
    }

    set category(category: string) {
        this.attibutes.category = category;
    }

    set image(image: string) {
        this.attibutes.image = image;
    }

    set promotion(promotion: boolean) {
        this.attibutes.promotion = promotion;
    }
}