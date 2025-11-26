import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional({
        example: "newemail@example.com",
        description: "Updated email of the user"
    })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiPropertyOptional({
        example: "newpassword123",
        description: "Updated password of the user"
    })
    @IsString()
    @IsOptional()
    password: string;

    @ApiPropertyOptional({
        example: true,
        description: "Set true for admin user"
    })
    @IsBoolean()
    @IsOptional()
    admin: boolean
}
