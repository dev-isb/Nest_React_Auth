import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const allData = await this.userService.findAll();
    console.log(allData);
    const user = await this.userService.findByUsername(username);
    if (user && (await user.comparePassword(password))) {
      const { password, ...result } = user;
      return result; // Return user data without password
    }
    return null; // Return null if user is not valid
  }

  async login(user: any) {
    // Validate the user's credentials
    const response = await this.validateUser(user.username, user.password);    
    if (!response) {
      // If validation fails, throw an UnauthorizedException
      throw new UnauthorizedException('Invalid username or password');
    }

    // If the user is validated, generate and return a JWT
    const payload = { username: response.username, sub: response._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
