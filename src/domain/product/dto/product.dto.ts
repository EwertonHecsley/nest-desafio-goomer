import { IsBoolean, IsInstance, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import Identity from "src/core/entities/identity.generic";

export class ProductDto {

    @IsString()
    @IsNotEmpty({ message: "Name is required" })
    name: string;

    @IsNumber()
    @IsNotEmpty({ message: "Price is required" })
    price: number;

    @IsString()
    @IsNotEmpty({ message: "Category is required" })
    category: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsBoolean()
    @IsNotEmpty({ message: "Promotion is required, true or false" })
    promotion: boolean;

    @IsOptional()
    entityId?: Identity; // Supondo que Identity é um tipo válido em seu projeto

    @IsOptional()
    attributes?: any;

    @IsOptional()
    id?: string;
}