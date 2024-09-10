import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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
}