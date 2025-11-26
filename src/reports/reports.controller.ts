import {
    Controller,
    Post,
    Body,
    UseGuards,
    Patch,
    Param,
    Get,
    Query,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/go-estimate.dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SuccessResponseDto } from './dtos/success-response.dto';
import { ErrorResponseDto } from './dtos/error-response.dto';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @Get()
    @ApiOperation({ summary: "Generate estimate based on query values" })
    @ApiResponse({
        description: "Returns the calculated estimate"
    })
    // @ApiQuery({ type: GetEstimateDto })
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportsService.createEstimate(query);
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    @ApiCreatedResponse({
        description: 'Report created successfully',
        type: SuccessResponseDto,
    })
    @ApiUnauthorizedResponse({
        description: 'User is not authenticated',
        type: ErrorResponseDto,
    })
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        if (!user) {
            throw new UnauthorizedException('User must be logged in to create a report');
        }

        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    @ApiOkResponse({
        description: 'Report approval status changed successfully',
        type: SuccessResponseDto,
    })
    @ApiForbiddenResponse({
        description: 'User is not an admin',
        type: ErrorResponseDto,
    })
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportsService.changeApproval(id, body.approved);
    }
}
