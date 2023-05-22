import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './domain/entities/user.entity';
import { UserService } from './application/user.service';
import { UserRepository } from './domain/repositories/user.repository';
import { UserController } from './infrastructure/controllers/user.controller';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../config/auth.config';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthService],
  exports: [AuthService],
})
export class UserModule {}
