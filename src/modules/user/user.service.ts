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

	findAllUserType() {
		return this.prisma.userType.findMany();
	}

	findOneByNameUserType(name: string) {
		return this.prisma.userType.findFirstOrThrow({
			where: {
				name,
			},
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

	findOneByEmailAndUserType(email: string, usertypeId: number) {
		return this.prisma.users.findFirst({
			where: {
				email,
				usertypeId,
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
