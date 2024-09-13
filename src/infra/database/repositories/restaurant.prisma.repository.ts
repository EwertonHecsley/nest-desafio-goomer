import Restaurant from "src/domain/restaurant/entity/restaurant.entity";
import { RestaurantRepository } from "src/domain/restaurant/repository/restaurant.repository";
import { PrismaService } from "../prisma/prisma.service";
import { RestaurantPrismaMapper } from "../prisma/mappers/restaurant.prisma.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RestaurantPrismaRepository implements RestaurantRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async create(restaurant: Restaurant): Promise<Restaurant> {
        const data = RestaurantPrismaMapper.toDatabase(restaurant);

        const restaurantData = await this.prismaService.restaurant.create({ data });

        return RestaurantPrismaMapper.toDomain(restaurantData);
    }

    async listAll(): Promise<Restaurant[]> {
        const productsDatabase = await this.prismaService.restaurant.findMany();

        return productsDatabase.map(RestaurantPrismaMapper.toDomain);
    }
}