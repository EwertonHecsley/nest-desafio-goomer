import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateRestaurant } from '../use-case/create.restaurant';
import { Response } from 'express';
import { RestaurantPresenter } from 'src/infra/presenters/restaurant.presenter';

@Controller('restaurant')
export class RestaurantController {
    constructor(
        private readonly createService: CreateRestaurant
    ) { }

    @Post()
    async create(@Body() dataBody: any, @Res() response: Response) {
        try {
            const result = await this.createService.execute(dataBody);

            if (result.isLeft()) {
                throw new BadRequestException(result.value);
            }

            return response.status(HttpStatus.CREATED).json(RestaurantPresenter.toHttp(result.value));

        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while creating the restaurant.' });
        }
    }
}
