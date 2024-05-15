import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';

@ApiTags('Accounts')
@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Get()
	async findAll() {
		return await this.accountService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		return await this.accountService.findOne(id);
	}
}
