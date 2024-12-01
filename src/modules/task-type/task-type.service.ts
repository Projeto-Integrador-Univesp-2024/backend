import { Injectable } from '@nestjs/common';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class TaskTypeService {
	constructor(private readonly prisma: PrismaService) {}

	create(createTaskTypeDto: CreateTaskTypeDto) {
		return 'This action adds a new taskType';
	}

	public async findAll(guardianId: string) {
		return await this.prisma.taskType.findMany({
			where: {
				user: {
					publicId: guardianId,
				},
			},
		});
	}

	public async findOne(id: number) {
		return await this.prisma.taskType.findUnique({
			where: {
				id,
			},
		});
	}

	update(id: number, updateTaskTypeDto: UpdateTaskTypeDto) {
		return `This action updates a #${id} taskType`;
	}

	remove(id: number) {
		return `This action removes a #${id} taskType`;
	}
}
