import { Either, right } from "src/errors/either/either";
import Restaurant from "../entity/restaurant.entity";
import { RestaurantRepository } from "../repository/restaurant.repository";

type Response = Either<null, Restaurant[]>

export class ListRestaurant {
    constructor(private restaurantRepository: RestaurantRepository) { }

    async execute(): Promise<Response> {
        const listRestaurant = await this.restaurantRepository.listAll();

        return right(listRestaurant);
    }
}