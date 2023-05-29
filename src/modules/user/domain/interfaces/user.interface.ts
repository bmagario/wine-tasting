import { User } from '../entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: number, userData: Partial<User>): Promise<User | undefined>;
  delete(id: number): Promise<void>;
}
