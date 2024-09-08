import { Module } from '@nestjs/common';
import { RestaurantModule } from './domain/restaurant/restaurant.module';
import { ProductModule } from './domain/product/product.module';


@Module({
  imports: [RestaurantModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
