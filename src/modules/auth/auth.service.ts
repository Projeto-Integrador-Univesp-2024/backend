import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/config/database/prisma.service';
import { UserService } from '../user/user.service';
import { UserTypes } from 'src/enums/userType';
import { ChildService } from '../child/child.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly childService: ChildService,
	) {}

	async create(_createAuthDto: CreateAuthDto) {
		const userType = await this.userService.findOneByNameUserType(
			_createAuthDto.userType,
		);

		const userExists = await this.userService.findOneByEmailAndUserType(
			_createAuthDto.email,
			userType.id,
		);

		if (!userExists) {
			const user = await this.userService.create({
				name: _createAuthDto.name,
				email: _createAuthDto.email,
				age: _createAuthDto.age,
				image: _createAuthDto.image,
				usertypeId: userType.id,
			});

			if (_createAuthDto.userType === UserTypes.CHILD) {
				await this.childService.create({
					userId: user.id,
				});
			}

			return {
				data: user,
				message: `User ${user.id} created successfully`,
				status: HttpStatus.CREATED,
			};
		}

		return {
			data: null,
			message: 'User already created',
			status: HttpStatus.CONFLICT,
		};
	}

	findAll() {
		return this.prisma.child.findMany();
	}

	findOneByEmail(email: string) {
		return `This action returns a #${email} auth`;
	}

	update(id: number, _updateAuthDto: UpdateAuthDto) {
		return this.userService.update(id, _updateAuthDto);
	}

	remove(id: number) {
		return this.userService.remove(id);
	}
}
