import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../../domain/entities/user.entity';
import { UserService } from '../user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of users',
    type: User,
    isArray: true,
  })
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Returns a user', type: User })
  async getUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'User updated', type: User })
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted', type: User })
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
