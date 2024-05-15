import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class SessionsService {
	constructor(private readonly prisma: PrismaService) {}

	create(_createSessionDto: CreateSessionDto) {
		return this.prisma.sessions.create({
			data: _createSessionDto,
		});
	}

	findAll() {
		return this.prisma.sessions.findMany();
	}

	findOne(id: number) {
		return this.prisma.sessions.findFirstOrThrow({
			where: {
				id,
			},
		});
	}

	update(id: number, _updateSessionDto: UpdateSessionDto) {
		return this.prisma.sessions.update({
			where: {
				id,
			},
			data: _updateSessionDto,
		});
	}

	remove(id: number) {
		return this.prisma.sessions.delete({
			where: {
				id,
			},
		});
	}
}
