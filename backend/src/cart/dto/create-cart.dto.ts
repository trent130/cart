import { IsNotEmpty, IsString, IsNumber, IsDecimal } from 'class-validator';

export class CreateCartDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsNumber()
    property_id: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    
    @IsNotEmpty()
    @IsDecimal()
    price: number;
}
