import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	public async create(_createUserDto: CreateUserDto) {
		const user = await this.validate(
			_createUserDto.email,
			_createUserDto.password,
		);

		if (user) {
			return user;
		}

		return await this.prisma.user.create({
			data: {
				..._createUserDto,
				dateOfBirth: new Date(_createUserDto.dateOfBirth),
				password: await this.encryptPassword(_createUserDto.password),
			},
		});
	}

	public async findOne(id: number) {
		const user = await this.prisma.user.findFirstOrThrow({
			where: {
				id,
			},
			include: {
				userType: true,
			},
		});

		return user;
	}

	public async findOneByPublicId(publicId: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				publicId,
			},
		});

		return user;
	}

	public async validate(email: string, password: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				email,
			},
			include: {
				userType: true,
			},
		});

		if (user && (await this.comparePassword(password, user.password))) {
			return user;
		}

		return null;
	}

	public async update(id: number, _updateUserDto: UpdateUserDto) {
		const user = await this.findOne(id);
		return await this.prisma.user.update({
			where: {
				id,
			},
			data: {
				..._updateUserDto,
				password: _updateUserDto.password
					? await this.encryptPassword(_updateUserDto.password)
					: user.password,
				dateOfBirth: _updateUserDto.dateOfBirth
					? new Date(_updateUserDto.dateOfBirth)
					: user.dateOfBirth,
			},
		});
	}

	public async remove(id: number) {
		return await this.prisma.user.delete({
			where: {
				id,
			},
		});
	}

	private async encryptPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}

	private async comparePassword(
		password: string,
		hashPassword: string,
	): Promise<boolean> {
		return await bcrypt.compare(password, hashPassword);
	}
}
