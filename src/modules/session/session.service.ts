import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class SessionService {
	constructor(private readonly prisma: PrismaService) {}

	async create(_createSessionDto: CreateSessionDto) {
		const session = await this.findOne(_createSessionDto.userId);

		if (session) await this.remove(session.id);

		return await this.prisma.session.create({
			data: _createSessionDto,
		});
	}

	async findAll() {
		return await this.prisma.session.findMany();
	}

	async findOne(userId: number) {
		return await this.prisma.session.findFirst({
			where: {
				userId,
			},
		});
	}

	async remove(id: number) {
		return await this.prisma.session.delete({
			where: {
				id,
			},
		});
	}
}
