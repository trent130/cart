import { IsNotEmpty, IsString, IsNumber, IsDecimal, IsOptional, Min } from 'class-validator';

export class CreateCartDto {
    @IsOptional()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsNumber()
    property_id: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
    
    @IsNotEmpty()
    @IsNumber()
    price: number;
}
