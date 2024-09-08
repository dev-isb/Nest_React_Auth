import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private userService: UserService, // Inject UserService in constructor
  ) {}
  @UseGuards(JwtAuthGuard)
  
  @Get()
  async get(req) {
    return this.userService.findAll();
  }
}
