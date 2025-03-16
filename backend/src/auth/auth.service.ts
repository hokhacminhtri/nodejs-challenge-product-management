import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

interface User {
  username: string;
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Validate user credentials
  validateUser(username: string, password: string): User | null {
    const envUsername = process.env.AUTH_USERNAME;
    const envPassword = process.env.AUTH_PASSWORD;

    if (username === envUsername && password === envPassword) {
      return { username, userId: 1 };
    }
    return null;
  }

  login(user: User) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
