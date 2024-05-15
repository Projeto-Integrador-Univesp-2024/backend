import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';

@Injectable()
export class AccountService {
	constructor(private readonly prisma: PrismaService) {}

	findAll() {
		return this.prisma.accounts.findMany();
	}

	findOne(id: number) {
		return this.prisma.accounts.findFirstOrThrow({
			where: {
				id,
			},
		});
	}

	findOneByAccessTokenAndUserId(access_token: string, userId: number) {
		return this.prisma.accounts.findFirst({
			where: {
				access_token,
				userId,
			},
		});
	}

	findOneByUserId(userId: number) {
		return this.prisma.accounts.findFirst({
			where: {
				userId,
			},
		});
	}

	create(_createAccountDto: CreateAccountDto) {
		return this.prisma.accounts.create({
			data: _createAccountDto,
		});
	}

	update(id: number, _updateAccountDto: UpdateAccountDto) {
		console.log(id, _updateAccountDto);
		return this.prisma.accounts.update({
			where: {
				id,
			},
			data: _updateAccountDto,
		});
	}

	delete(id: number): void {
		this.prisma.accounts.delete({
			where: {
				id,
			},
		});
	}
}
