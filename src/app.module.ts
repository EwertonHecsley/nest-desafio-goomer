import { Module } from '@nestjs/common';
import { RestaurantModule } from './domain/restaurant/restaurant.module';
import { ProductModule } from './domain/product/product.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';


@Module({
  imports: [RestaurantModule, ProductModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
