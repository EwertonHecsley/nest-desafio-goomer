import { BadGatewayException, Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductPresenter } from 'src/infra/presenters/product.presenter';
import { ListProducts } from '../use-case/list.products';
import { CreateProduct } from '../use-case/create.product';
import { ProductDto } from '../dto/product.dto';

@Controller('product')
export class ProductController {
    constructor(
        private readonly listService: ListProducts,
        private readonly createService: CreateProduct
    ) { }

    @Post()
    async create(@Body() dataBody: ProductDto, @Res() response: Response) {
        const result = await this.createService.execute(dataBody);

        if (result.isLeft()) {
            throw new BadGatewayException(result.value);
        }

        return response.status(HttpStatus.CREATED).json(ProductPresenter.toHttp(result.value));
    }

    @Get()
    async handler(@Res() response: Response) {
        const result = await this.listService.execute();

        if (result.isLeft()) {
            throw new BadGatewayException(result.value);
        }

        const products = result.value.map(product => ProductPresenter.toHttp(product));

        return response.status(HttpStatus.OK).json(products);
    }
}
