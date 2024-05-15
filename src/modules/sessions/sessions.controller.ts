import { Controller, Get, Param } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Session')
@Controller('sessions')
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}

	@Get()
	findAll() {
		return this.sessionsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.sessionsService.findOne(+id);
	}
}
