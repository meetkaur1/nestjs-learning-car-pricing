import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    Query,
    NotFoundException,
    Session,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) { }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get currently logged-in user' })
    @ApiResponse({ status: 200, description: 'Returns current user' })
    whoAmI(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signout')
    @ApiOperation({ summary: 'Logout user' })
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signup')
    @ApiOperation({ summary: 'Signup new user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    @ApiOperation({ summary: 'Login existing user' })
    @ApiBody({ type: CreateUserDto })
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Find user by ID' })
    @ApiParam({ name: 'id', type: Number })
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Get()
    @ApiOperation({ summary: 'Find all users by email' })
    @ApiQuery({ name: 'email', required: false })
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiParam({ name: 'id', type: Number })
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiParam({ name: 'id', type: Number })
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}
