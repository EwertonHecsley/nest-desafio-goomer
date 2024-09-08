import Entity from "src/core/entities/entity.generic"
import Identity from "src/core/entities/identity.generic";
import { Optional } from "src/utils/types/optional.types";

type RestaurantType = {
    name: string;
    address: string;
    openningHours: string;
    image: string;
}

export default class Restaurant extends Entity<RestaurantType> {
    static create(data: Optional<RestaurantType, 'image'>, id?: Identity) {
        return new Restaurant(
            {
                ...data,
                image: data.image ?? 'no image'
            }
        );
    }

    get name(): string {
        return this.attibutes.name;
    }

    get address(): string {
        return this.attibutes.address;
    }

    get openningHours(): string {
        return this.attibutes.openningHours;
    }

    get image(): string {
        return this.attibutes.image;
    }

    set name(name: string) {
        this.attibutes.name = name;
    }

    set address(address: string) {
        this.attibutes.address = address;
    }

    set openningHours(openningHours: string) {
        this.attibutes.openningHours = openningHours;
    }

    set image(image: string) {
        this.attibutes.image = image;
    }
}