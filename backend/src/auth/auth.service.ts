import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User {
  username: string;
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Validate user credentials
  validateUser(username: string, password: string): User | null {
    // Implement your user validation logic here
    // For example, check the username and password against a database
    if (username === 'test' && password === 'password') {
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
