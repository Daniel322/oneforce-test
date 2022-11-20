import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'get list of users',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'get current user from id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
