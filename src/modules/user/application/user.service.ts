import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { User } from '../domain/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserConverter } from './converters/user.converter';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = UserConverter.toEntity(createUserDto);
    return this.userRepository.create(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    return UserConverter.toUpdateEntity(user, updateUserDto);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
