import { Module } from '@nestjs/common';
import { RestaurantModule } from './domain/restaurant/restaurant.module';
import { ProductModule } from './domain/product/product.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate
    }),
    RestaurantModule,
    ProductModule,
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
