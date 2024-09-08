import { BadGatewayException, Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductPresenter } from 'src/infra/presenters/product.presenter';
import { ListProducts } from '../use-case/list.products';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ListProducts) { }

    @Get()
    async handler(@Res() response: Response) {
        const result = await this.productService.execute();

        if (result.isLeft()) {
            throw new BadGatewayException(result.value);
        }

        const products = result.value.map(product => ProductPresenter.toHttp(product));

        return response.status(HttpStatus.OK).json(products);
    }
}
