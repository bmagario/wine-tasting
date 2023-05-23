import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { User } from '../domain/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserConverter } from './converters/user.converter';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = UserConverter.toEntity(createUserDto);
    return this.userRepository.createUser(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    const updatedUser = UserConverter.toUpdateEntity(user, updateUserDto);
    return this.userRepository.updateUser(updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
