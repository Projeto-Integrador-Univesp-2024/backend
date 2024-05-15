import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('/userType')
	findAllUserTypes() {
		return this.userService.findAllUserType();
	}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Get('/userType/:name')
	findOneByNameUserType(@Param('name') name: string) {
		return this.userService.findOneByNameUserType(name);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id);
	}
}
