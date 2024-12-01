import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Goals')
@Controller('goal')
export class GoalController {
	constructor(private readonly goalService: GoalService) {}

	@Post()
	public async create(@Body() _createGoalDto: CreateGoalDto) {
		return await this.goalService.create(_createGoalDto);
	}

	@Get('/guardian/:id')
	public async findAllByGuardian(@Param('id') id: string) {
		return await this.goalService.findAllByGuardian(id);
	}

	@Get('/detail/:id')
	public async findOne(@Param('id') id: string) {
		return await this.goalService.findOne(+id);
	}
}
