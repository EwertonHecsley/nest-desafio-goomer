import { Either, left, right } from "src/errors/either/either";
import { RestaurantRepository } from "../repository/restaurant.repository";
import { HttpException } from "src/errors/generic.httpException";
import Restaurant from "../entity/restaurant.entity";

type Request = {
    id: string;
}

type Response = Either<HttpException, Restaurant>

export class FindByIdRestaurant {
    constructor(private restaurantRepository: RestaurantRepository) { }

    async execute({ id }: Request): Promise<Response> {
        const restaurant = await this.restaurantRepository.findById(id);

        if (!restaurant) {
            return left(new HttpException(404, "Restaurant Not Found"));
        }

        return right(restaurant);
    }
}