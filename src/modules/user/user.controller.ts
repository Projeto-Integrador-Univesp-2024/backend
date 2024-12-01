import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/guards/jwt.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	public async create(@Body() _createUserDto: CreateUserDto) {
		const user = await this.userService.create(_createUserDto);

		return {
			data: user,
			message: 'User created successfully',
			status: HttpStatus.CREATED,
		};
	}

	@Get('/:id')
	@UseGuards(JwtGuard)
	public async find(@Param('id') id: string) {
		const user = await this.userService.findOne(+id);

		return {
			data: user,
			message: 'User finded successfully',
			status: HttpStatus.OK,
		};
	}
	
}
