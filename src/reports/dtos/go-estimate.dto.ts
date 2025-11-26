import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetEstimateDto {
    @ApiProperty({
        example: "Toyota",
        description: "Car manufacturer name"
    })
    @IsString()
    make: string;

    @ApiProperty({
        example: "Corolla",
        description: "Car model name"
    })
    @IsString()
    model: string;

    @ApiProperty({
        example: 2020,
        description: "Manufacturing year of the car",
        minimum: 1930,
        maximum: 2050
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @ApiProperty({
        example: 45000,
        description: "Mileage of the car in kilometers",
        minimum: 0,
        maximum: 1000000
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @ApiProperty({
        example: 77.1025,
        description: "Longitude of the location"
    })
    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    lng: number;

    @ApiProperty({
        example: 28.7041,
        description: "Latitude of the location"
    })
    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    lat: number;
}
