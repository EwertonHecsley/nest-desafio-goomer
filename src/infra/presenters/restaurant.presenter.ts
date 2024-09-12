import Restaurant from "src/domain/restaurant/entity/restaurant.entity";

export class RestaurantPresenter {
    static toHttp(entity: Restaurant) {
        return {
            id: entity.id,
            name: entity.name,
            address: entity.address,
            openningHours: entity.openningHours,
            image: entity.image
        }
    }
}