import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class GoalService {
	constructor(private readonly prisma: PrismaService) {}

	async create(_createGoalsDto: CreateGoalDto) {
		try {
			const goal = await this.findOneByTitleAndChild(_createGoalsDto);

			if (goal) return goal;

			return await this.prisma.goal.create({
				data: _createGoalsDto,
			});
		} catch (error) {
			return null;
		}
	}

	public async findOne(id: number) {
		return await this.prisma.goal.findUnique({
			where: {
				id,
			},
			include: {
				child: {
					include: {
						user: true,
					},
				},
			},
		});
	}

	async findOneByTitleAndChild({
		childId,
		title,
	}: {
		childId: number;
		title: string;
	}) {
		return await this.prisma.goal.findFirst({
			where: {
				childId,
				title,
			},
		});
	}

	public async findAllByGuardian(guardianId: string) {
		return await this.prisma.goal.findMany({
			where: {
				child: {
					guardian: {
						publicId: guardianId,
					},
				},
			},
			include: {
				child: {
					include: {
						user: true,
					},
				},
			},
		});
	}
}
