import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { jwtConfig } from '../../config/auth.config';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User): Promise<string> {
    // Implementar la lógica para generar un token JWT con los datos del usuario
    return this.jwtService.sign({ userId: user.id });
  }

  async verifyToken(token: string): Promise<User | null> {
    // Implementar la lógica para verificar y decodificar un token JWT, devolviendo los datos del usuario si el token es válido
    try {
      const payload = this.jwtService.verify(token);
      const userId = payload['userId'];
      // Obtener y retornar los datos del usuario según el ID de usuario en el token
    } catch (error) {
      return null;
    }
  }
}
