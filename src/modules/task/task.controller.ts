import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get('/child/:id')
	public async findAllByChild(@Param('id') id: string) {
		return await this.taskService.findAllByChild(id);
	}

	@Get('/guardian/:id')
	public async findAllByGuardian(@Param('id') id: string) {
		return await this.taskService.findAllByGuardian(id);
	}

	@Get('/detail/:id')
	public async findOne(@Param('id') id: string) {
		return await this.taskService.findOne(+id);
	}

	@Post()
	public async create(@Body() _createTaskDto: CreateTaskDto) {
		return await this.taskService.create(_createTaskDto);
	}

	@Post('/check/:id')
	public async checkTask(@Param('id') id: string) {
		return await this.taskService.updateTaskStatus(+id, 'DONE');
	}

	@Patch(':id')
	public async update(
		@Param('id') id: string,
		@Body() updateTaskDto: UpdateTaskDto,
	) {
		return await this.taskService.update(+id, updateTaskDto);
	}

	@Delete(':id')
	public async remove(@Param('id') id: string) {
		return await this.taskService.remove(+id);
	}
}
