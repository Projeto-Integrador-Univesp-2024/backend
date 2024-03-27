import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Session')
@Controller('sessions')
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}

	@Post()
	create(@Body() _createSessionDto: CreateSessionDto) {
		return this.sessionsService.create(_createSessionDto);
	}

	@Get()
	findAll() {
		return this.sessionsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.sessionsService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() _updateSessionDto: UpdateSessionDto,
	) {
		return this.sessionsService.update(+id, _updateSessionDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.sessionsService.remove(+id);
	}
}
