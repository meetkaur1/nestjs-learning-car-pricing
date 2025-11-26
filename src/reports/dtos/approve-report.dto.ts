import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ApproveReportDto {
    @ApiProperty({ example: true })
    @IsBoolean()
    approved: boolean;
}
