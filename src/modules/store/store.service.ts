import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class StoreService {
	constructor(private readonly prisma: PrismaService) {}

	public async create(createStoreDto: CreateStoreDto) {
		const store = await this.findOne(createStoreDto.childId);

		if (store) return store;

		return await this.prisma.store.create({
			data: createStoreDto,
		});
	}

	public async findOne(childId: number) {
		return await this.prisma.store.findUnique({
			where: {
				childId,
			},
		});
	}

	public async remove(id: number) {
		return await this.prisma.store.update({
			where: {
				id,
			},
			data: {
				deletedAt: new Date(),
			},
		});
	}
}
