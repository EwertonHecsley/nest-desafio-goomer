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
            },
            id
        );
    }

    get name(): string {
        return this.attributes.name;
    }

    get address(): string {
        return this.attributes.address;
    }

    get openningHours(): string {
        return this.attributes.openningHours;
    }

    get image(): string {
        return this.attributes.image;
    }

    set name(name: string) {
        this.attributes.name = name;
    }

    set address(address: string) {
        this.attributes.address = address;
    }

    set openningHours(openningHours: string) {
        this.attributes.openningHours = openningHours;
    }

    set image(image: string) {
        this.attributes.image = image;
    }
}