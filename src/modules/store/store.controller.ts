import { Controller, Get, Param, Delete } from '@nestjs/common';
import { StoreService } from './store.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Store')
@Controller('store')
export class StoreController {
	constructor(private readonly storeService: StoreService) {}

	@Get(':id')
	public async findOne(@Param('id') id: string) {
		return this.storeService.findOne(+id);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.storeService.remove(+id);
	}
}
