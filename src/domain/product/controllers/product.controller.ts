import { Body, Controller, Get, HttpStatus, Param, Post, Res, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ProductPresenter } from 'src/infra/presenters/product.presenter';
import { ListProducts } from '../use-case/list.products';
import { CreateProduct } from '../use-case/create.product';
import { ProductDto } from '../dto/product.dto';
import { FindById } from '../use-case/findById.product';
import { NotFoundError } from 'src/errors/custom/notFound.error';

@Controller('product')
export class ProductController {
    constructor(
        private readonly listService: ListProducts,
        private readonly createService: CreateProduct,
        private readonly findByIdService: FindById
    ) { }

    @Post()
    async create(@Body() dataBody: ProductDto, @Res() response: Response) {
        try {
            const result = await this.createService.execute(dataBody);

            if (result.isLeft()) {
                throw new BadRequestException(result.value);
            }

            return response.status(HttpStatus.CREATED).json(ProductPresenter.toHttp(result.value));
        } catch (error) {

            if (error instanceof BadRequestException) {
                return response.status(HttpStatus.BAD_GATEWAY).json(error.message);
            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json('An error occurred while creating the product.');
            }
        }
    }

    @Get()
    async handler(@Res() response: Response) {
        try {
            const result = await this.listService.execute();

            if (result.isLeft()) {
                throw new BadRequestException(result.value);
            }

            const products = result.value.map(product => ProductPresenter.toHttp(product));
            return response.status(HttpStatus.OK).json(products);
        } catch (error) {

            if (error instanceof BadRequestException) {
                return response.status(HttpStatus.BAD_GATEWAY).json(error.message);
            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json('An error occurred while fetching products.');
            }
        }
    }

    @Get(":id")
    async findById(@Param('id') id: string, @Res() response: Response) {
        try {
            const result = await this.findByIdService.execute({ id });

            if (result.isLeft()) {
                throw new BadRequestException(result.value);
            }

            return response.status(HttpStatus.OK).json(ProductPresenter.toHttp(result.value));
        } catch (error) {
            if (error instanceof NotFoundError) {
                return response.status(HttpStatus.NOT_FOUND).json();
            } else if (error instanceof BadRequestException) {
                return response.status(HttpStatus.BAD_GATEWAY).json(error.message);
            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
            }
        }
    }
}
