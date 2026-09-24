import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.services.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error: any) {
      return { message: 'Error fetching users', error: error.message };
    }
  }
}
