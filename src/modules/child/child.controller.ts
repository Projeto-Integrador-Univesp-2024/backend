import { Controller, Get, Param } from '@nestjs/common';
import { ChildService } from './child.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Child')
@Controller('child')
export class ChildController {
	constructor(private readonly childService: ChildService) {}

	@Get()
	findAll() {
		return this.childService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.childService.findOne(+id);
	}
}
