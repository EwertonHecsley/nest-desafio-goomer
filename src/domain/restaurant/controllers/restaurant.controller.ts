import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateRestaurant } from '../use-case/create.restaurant';
import { Response } from 'express';
import { RestaurantPresenter } from 'src/infra/presenters/restaurant.presenter';
import { RestaurantDto } from '../dto/restaurant.dto';
import { ListRestaurant } from '../use-case/list.restaurant';

@Controller('restaurant')
export class RestaurantController {
    constructor(
        private readonly createService: CreateRestaurant,
        private readonly listService: ListRestaurant
    ) { }

    @Post()
    async create(@Body() dataBody: RestaurantDto, @Res() response: Response) {
        const { name, address, image, openningHours } = dataBody;

        try {
            const result = await this.createService.execute({ name, address, image, openningHours });
            console.log(result)

            if (result.isLeft()) {
                throw new BadRequestException(result.value);
            }

            return response.status(HttpStatus.CREATED).json(RestaurantPresenter.toHttp(result.value));

        } catch (error) {

            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while creating the restaurant.' });
        }
    }

    @Get()
    async handler(@Res() response: Response) {

        try {
            const listRestaurant = await this.listService.execute();

            if (listRestaurant.isLeft()) {
                throw new BadRequestException(listRestaurant.value);
            }

            const restaurants = listRestaurant.value.map(restaurant => RestaurantPresenter.toHttp(restaurant));

            return response.status(HttpStatus.OK).json(restaurants);

        } catch (error) {
            if (error instanceof BadRequestException) {
                return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json('An error occurred while fetching products.');
            }
        }

    }
}
