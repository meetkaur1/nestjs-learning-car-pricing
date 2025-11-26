import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<T = any> {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty()
    data: T;

    @ApiProperty({ example: 'Operation successful' })
    message: string;
}
