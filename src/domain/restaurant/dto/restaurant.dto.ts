import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import Identity from "src/core/entities/identity.generic";

export class RestaurantDto {

    @IsString()
    @IsNotEmpty({ message: "Name is required" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Addres is required" })
    address: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsNotEmpty({ message: "Openning hours is required" })
    openningHours: string;

    @IsOptional()
    entityId?: Identity;

    @IsOptional()
    attributes?: any;

    @IsOptional()
    id?: string;
}