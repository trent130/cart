import { IsNotEmpty, IsString, IsNumber, IsDecimal } from 'class-validator';

export class CreateCartDto {
    @IsString()
    userId: string;

    @IsNumber()
    property_id: number;

    @IsNumber()
    quantity: number;

    @IsDecimal()
    price: number;
}
