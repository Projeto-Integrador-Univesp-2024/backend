import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
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

	@Post()
	async create(@Body() _createAccountDto: CreateAccountDto) {
		return await this.accountService.create(_createAccountDto);
	}

	@Put(':id')
	async update(
		@Param('id') id: number,
		@Body() _updateAccountDto: UpdateAccountDto,
	) {
		return await this.accountService.update(id, _updateAccountDto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.accountService.delete(id);
	}
}
