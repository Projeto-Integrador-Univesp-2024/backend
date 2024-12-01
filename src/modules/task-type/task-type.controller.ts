import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { TaskTypeService } from './task-type.service';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TaskType')
@Controller('task-type')
export class TaskTypeController {
	constructor(private readonly taskTypeService: TaskTypeService) {}

	@Post()
	create(@Body() createTaskTypeDto: CreateTaskTypeDto) {
		return this.taskTypeService.create(createTaskTypeDto);
	}

	@Get('/detail/:id')
	findOne(@Param('id') id: string) {
		return this.taskTypeService.findOne(+id);
	}

	@Get(':id')
	findAll(@Param('id') id: string) {
		return this.taskTypeService.findAll(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateTaskTypeDto: UpdateTaskTypeDto,
	) {
		return this.taskTypeService.update(+id, updateTaskTypeDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.taskTypeService.remove(+id);
	}
}
