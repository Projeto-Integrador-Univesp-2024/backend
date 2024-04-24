import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	create(_createUserDto: CreateUserDto) {
		return this.prisma.users.create({
			data: _createUserDto,
		});
	}

	findAll() {
		return this.prisma.users.findMany();
	}

	findOne(id: number) {
		return this.prisma.users.findFirstOrThrow({
			where: {
				id,
			},
		});
	}

	update(id: number, _updateUserDto: UpdateUserDto) {
		return this.prisma.users.update({
			where: {
				id,
			},
			data: _updateUserDto,
		});
	}

	remove(id: number) {
		return this.prisma.users.delete({
			where: {
				id,
			},
		});
	}
}
