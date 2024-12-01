import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class TaskService {
	constructor(private readonly prisma: PrismaService) {}

	public async create(_createTaskDto: CreateTaskDto) {
		try {
			const task = await this.prisma.task.create({
				data: _createTaskDto,
			});

			return {
				data: task,
				message: 'Task created successfully!',
				status: HttpStatus.CREATED,
			};
		} catch (error) {
			return {
				data: null,
				message: error,
				status: HttpStatus.CONFLICT,
			};
		}
	}

	public async updateTaskStatus(id: number, status: Task.Status) {
		try {
			const task = await this.prisma.task.update({
				where: {
					id,
				},
				data: {
					status: status,
				},
			});

			return {
				data: task,
				message: 'Task completed',
				status: HttpStatus.ACCEPTED,
			};
		} catch (error) {
			return {
				data: null,
				message: error,
				status: HttpStatus.CONFLICT,
			};
		}
	}

	public async findAllByGuardian(guardianId: string) {
		try {
			const tasks = await this.prisma.child.findMany({
				include: {
					tasks: true,
					user: true,
				},
				where: {
					guardian: {
						publicId: guardianId,
					},
				},
				orderBy: {
					id: 'asc',
				},
			});

			if (tasks.length === 0) return [];

			return tasks;
		} catch (error) {
			return null;
		}
	}

	public async findAllByChild(childId: string) {
		try {
			const currentDate = new Date();
			const tasks = await this.prisma.task.findMany({
				include: {
					child: true,
					tasktypes: true,
				},
				where: {
					child: {
						user: {
							publicId: childId,
						},
					},
					deadline: {
						gte: currentDate,
					},
				},
				orderBy: {
					id: 'asc',
				},
			});

			if (tasks.length === 0) return [];

			return tasks;
		} catch (error) {
			return null;
		}
	}

	public async findOne(id: number) {
		try {
			const task = await this.prisma.task.findFirst({
				where: {
					id,
				},
				include: {
					child: true,
					tasktypes: true,
				},
			});

			if (!task) {
				return null;
			}

			return task;
		} catch (error) {
			return null;
		}
	}

	public async update(id: number, _updateTaskDto: UpdateTaskDto) {
		return await this.prisma.task.update({
			where: {
				id,
			},
			data: _updateTaskDto,
		});
	}

	public async remove(id: number) {
		return await this.prisma.task.update({
			where: {
				id,
			},
			data: {
				deletedAt: new Date(),
			},
		});
	}
}
