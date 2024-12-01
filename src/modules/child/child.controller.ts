import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ChildService } from './child.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@ApiTags('Child')
@Controller('child')
export class ChildController {
	constructor(private readonly childService: ChildService) {}

	@Get('/:id')
	findOne(@Param('id') id: string) {
		return this.childService.findOne(id);
	}

	@Get('/guardian/:id')
	findGuardianAll(@Param('id') id: string) {
		return this.childService.findGuardianAll(id);
	}

	@Post()
	create(@Body() _createChildDto: CreateChildDto) {
		return this.childService.create(_createChildDto);
	}

	@Patch('/:id')
	update(@Param('id') id: string, @Body() _updateChildDto: UpdateChildDto) {
		return this.childService.update(id, _updateChildDto);
	}
}
