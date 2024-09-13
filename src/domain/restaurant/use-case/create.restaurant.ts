import { Either, left, right } from "src/errors/either/either";
import { RestaurantRepository } from "../repository/restaurant.repository";
import { BadRequestException } from "@nestjs/common";
import Restaurant from "../entity/restaurant.entity";

type Request = {
    name: string;
    address: string;
    openningHours: string;
    image: string;
}

type Response = Either<BadRequestException, Restaurant>

export class CreateRestaurant {
    constructor(private RestaurantRepository: RestaurantRepository) { }

    async execute({ name, address, image, openningHours }: Request): Promise<Response> {

        const restaurant = Restaurant.create(
            {
                name,
                address,
                openningHours,
                image
            }
        )

        if (!restaurant) {
            return left(new BadRequestException())
        }

        await this.RestaurantRepository.create(restaurant);

        return right(restaurant);
    }
}