import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() _createUserDto: CreateUserDto) {
		return this.userService.create(_createUserDto);
	}

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

	@Patch(':id')
	update(@Param('id') id: string, @Body() _updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, _updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
