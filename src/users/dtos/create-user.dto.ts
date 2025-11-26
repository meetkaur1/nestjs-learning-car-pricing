import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class CreateUserDto {
    @ApiProperty({
        example: "testing@example.com",
        description: "User's email address"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "123456",
        description: "User password"
    })
    @IsString()
    password: string;
}
