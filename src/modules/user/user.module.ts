import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './application/user.service';
import { UserController } from './application/controllers/user.controller';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../config/auth.config';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [AuthService],
})
export class UserModule {}
