import Restaurant from "../entity/restaurant.entity";

export abstract class RestaurantRepository {
    abstract create(restaurant: Restaurant): Promise<Restaurant>;
    abstract listAll(): Promise<Restaurant[]>;
    abstract findById(id: string): Promise<Restaurant | null>;
}