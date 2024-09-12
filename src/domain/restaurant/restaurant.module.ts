import { Module } from '@nestjs/common';
import { RestaurantController } from './controllers/restaurant.controller';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { CreateRestaurant } from './use-case/create.restaurant';
import { RestaurantRepository } from './repository/restaurant.repository';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: CreateRestaurant,
            useFactory: (
                restaurantRepository: RestaurantRepository
            ) => {
                new CreateRestaurant(restaurantRepository)
            },
            inject: [RestaurantRepository]
        }
    ],
    controllers: [RestaurantController]
})
export class RestaurantModule { }
