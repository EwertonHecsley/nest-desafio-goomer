import { Module } from '@nestjs/common';
import { RestaurantController } from './controllers/restaurant.controller';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { CreateRestaurant } from './use-case/create.restaurant';
import { RestaurantRepository } from './repository/restaurant.repository';
import { ListRestaurant } from './use-case/list.restaurant';
import { FindByIdRestaurant } from './use-case/findById.restaurant';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: CreateRestaurant,
            useFactory: (
                restaurantRepository: RestaurantRepository
            ) => {
                return new CreateRestaurant(restaurantRepository)
            },
            inject: [RestaurantRepository]
        },
        {
            provide: ListRestaurant,
            useFactory: (
                restaurantRepository: RestaurantRepository
            ) => {
                return new ListRestaurant(restaurantRepository)
            },
            inject: [RestaurantRepository]
        },
        {
            provide: FindByIdRestaurant,
            useFactory: (
                restaurantRepository: RestaurantRepository
            ) => {
                return new FindByIdRestaurant(restaurantRepository)
            },
            inject: [RestaurantRepository]
        }
    ],
    controllers: [RestaurantController]
})
export class RestaurantModule { }
