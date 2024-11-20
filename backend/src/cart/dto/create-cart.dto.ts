import { IsNotEmpty, IsString, IsNumber, IsDecimal, IsOptional } from 'class-validator';

export class CreateCartDto {
    @IsOptional()
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
