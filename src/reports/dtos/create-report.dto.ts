import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude,
} from 'class-validator';

export class CreateReportDto {
    @ApiProperty({ example: 'Toyota' })
    @IsString()
    make: string;

    @ApiProperty({ example: 'Corolla' })
    @IsString()
    model: string;

    @ApiProperty({ example: 2010 })
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @ApiProperty({ example: 500000 })
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @ApiProperty({ example: 77.2090 })
    @IsLongitude()
    lng: number;

    @ApiProperty({ example: 28.6139 })
    @IsLatitude()
    lat: number;

    @ApiProperty({ example: 300000 })
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;
}
