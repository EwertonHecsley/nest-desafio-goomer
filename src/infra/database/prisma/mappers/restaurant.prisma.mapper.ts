import { Restaurant as RestaurantDatabase } from "@prisma/client";
import Identity from "src/core/entities/identity.generic";
import Restaurant from "src/domain/restaurant/entity/restaurant.entity";

export class RestaurantPrismaMapper {
    static toDomain(restaurant: RestaurantDatabase): Restaurant {
        return Restaurant.create(
            {
                name: restaurant.name,
                address: restaurant.address,
                openningHours: restaurant.openningHours,
                image: restaurant.image
            },
            new Identity(restaurant.id)
        )
    }

    static toDatabase(restaurant: Restaurant): RestaurantDatabase {
        return {
            id: restaurant.id.valueId,
            name: restaurant.name,
            address: restaurant.address,
            openningHours: restaurant.openningHours,
            image: restaurant.image
        }
    }
}