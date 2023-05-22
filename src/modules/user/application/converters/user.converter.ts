import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { User } from '../../domain/entities/user.entity';

export class UserConverter {
  static toEntity(createUserDto: CreateUserDto): User {
    const { name, email, password } = createUserDto;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    return user;
  }

  static toUpdateEntity(user: User, updateUserDto: UpdateUserDto): User {
    const { name, email, password } = updateUserDto;
    if (name !== undefined) {
      user.name = name;
    }
    if (email !== undefined) {
      user.email = email;
    }
    if (password !== undefined) {
      user.password = password;
    }
    return user;
  }
}
