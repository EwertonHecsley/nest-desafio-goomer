import { Body, Controller, Get, HttpStatus, Param, Post, Res, BadRequestException, Delete, Put } from '@nestjs/common';
import { Response } from 'express';
import { ProductPresenter } from 'src/infra/presenters/product.presenter';
import { ListProducts } from '../use-case/list.products';
import { CreateProduct } from '../use-case/create.product';
import { ProductDto } from '../dto/product.dto';
import { FindById } from '../use-case/findById.product';
import { HttpException } from 'src/errors/generic.httpException';
import { DeleteProduct } from '../use-case/delete.product';
import { UpdateProduct } from '../use-case/update.product';
import { UpdateProductDto } from '../dto/update.product.dto';

@Controller('product')
export class ProductController {
    constructor(
        private readonly listService: ListProducts,
        private readonly createService: CreateProduct,
        private readonly findByIdService: FindById,
        private readonly deleteService: DeleteProduct,
        private readonly updateService: UpdateProduct
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
                return response.status(HttpStatus.BAD_GATEWAY).json({ message: error.message });
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
                return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
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
                throw result.value;
            }

            return response.status(HttpStatus.OK).json(ProductPresenter.toHttp(result.value));

        } catch (error) {
            if (error instanceof HttpException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: error.message });

            } else if (error instanceof BadRequestException) {
                return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });

            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    @Put(":id")
    async updateById(@Param('id') id: string, @Body() dataBody: UpdateProductDto, @Res() response: Response) {

        try {
            const result = await this.updateService.execute({ id, product: dataBody });

            if (result.isLeft()) {
                throw result.value;
            }

            return response.status(HttpStatus.NO_CONTENT).json();

        } catch (error) {
            if (error instanceof HttpException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: error.message });

            } else if (error instanceof BadRequestException) {
                return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });

            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    @Delete(":id")
    async deleteById(@Param('id') id: string, @Res() response: Response) {
        try {
            const result = await this.deleteService.execute({ id });

            if (result.isLeft()) {
                throw new HttpException(404, result.value.message);
            }

            return response.status(HttpStatus.NO_CONTENT).json();

        } catch (error) {
            if (error instanceof HttpException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: error.message });

            } else if (error instanceof BadRequestException) {
                return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });

            } else {
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }
}
