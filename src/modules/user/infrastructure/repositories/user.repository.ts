import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async createUser(data: Partial<User>): Promise<User> {
    return this.userModel.create(data);
  }

  async updateUser(data: Partial<User>): Promise<User> {
    await this.userModel.update(data, { where: { id: data.id } });
    return this.userModel.findByPk(data.id);
  }

  async deleteUser(id: number): Promise<number> {
    return this.userModel.destroy({ where: { id } });
  }
}
