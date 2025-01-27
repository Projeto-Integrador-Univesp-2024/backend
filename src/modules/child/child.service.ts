import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/config/database/prisma.service';
import { UserService } from '../user/user.service';
import { StoreService } from '../store/store.service';

@Injectable()
export class ChildService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly storeService: StoreService,
	) {}

	public async create(_createChildDto: CreateChildDto) {
		const user = await this.userService.create({
			email: _createChildDto.email,
			dateOfBirth: _createChildDto.dateOfBirth,
			password: _createChildDto.password,
			userTypeId: _createChildDto.userTypeId,
			image: _createChildDto.image,
			name: _createChildDto.name,
		});
		const guardian = await this.userService.findOneByPublicId(
			_createChildDto.guardianId,
		);

		const child = await this.prisma.child.create({
			data: {
				userGuardianId: guardian.id,
				userChildId: user.id,
			},
		});

		await this.storeService.create({ childId: child.id });

		return child;
	}

	public async findOne(publicId: string) {
		return await this.prisma.child.findFirst({
			where: {
				user: {
					publicId,
				},
			},
			include: {
				user: true,
				guardian: true,
			},
		});
	}

	public async findGuardianAll(publicId: string) {
		const user = await this.userService.findOneByPublicId(publicId);

		if (!user)
			throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

		return await this.prisma.child.findMany({
			where: {
				userGuardianId: user.id,
			},
			include: {
				user: true,
				guardian: true,
			},
		});
	}

	public async findGuardianOne(publicId: string) {
		const user = await this.userService.findOneByPublicId(publicId);

		if (!user)
			throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

		return this.prisma.child.findFirst({
			where: {
				userGuardianId: user.id,
			},
			include: {
				user: true,
				guardian: true,
			},
		});
	}

	public async update(userId: string, _updateChildDto: UpdateChildDto) {
		const getUser = await this.userService.findOneByPublicId(userId);
		await this.userService.update(getUser.id, _updateChildDto);
		const child = await this.findOne(userId);

		return this.prisma.child.update({
			where: {
				id: child.id,
			},
			data: {
				points: _updateChildDto.points,
				tasksNeedsApproval: _updateChildDto.tasksNeedsApproval,
			},
		});
	}

	public async remove(id: number) {
		return this.prisma.child.delete({
			where: {
				id,
			},
		});
	}
}
