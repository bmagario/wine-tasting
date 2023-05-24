import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';

export class UserRepository extends Repository<User> {
  async createUser(wineData: Partial<User>): Promise<User> {
    const wine = this.create(wineData);
    return this.save(wine);
  }

  async findAllUsers(): Promise<User[]> {
    return this.find();
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.findOne({ where: { id } });
  }

  async updateUser(
    id: number,
    wineData: Partial<User>,
  ): Promise<User | undefined> {
    await this.update(id, wineData);
    return this.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(id);
  }
}
