import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class MetricsService {
	constructor(private readonly prisma: PrismaService) {}

	public async metrics(guardianId: string) {
		return {
			totalPoints: await this.findTotalPoints(guardianId),
			totalTasks: await this.findTotalTasks(guardianId),
			totalTasksDone: await this.findTotalTasksDone(guardianId),
		};
	}

	public async findLastsTasks(
		publicId: string,
		filter?: 'all' | 'year' | 'month' | 'week',
	) {
		let dateFilter = undefined;

		if (filter === 'year') {
			dateFilter = new Date();
			dateFilter.setFullYear(dateFilter.getFullYear() - 1);
		} else if (filter === 'month') {
			dateFilter = new Date();
			dateFilter.setMonth(dateFilter.getMonth() - 1);
		} else if (filter === 'week') {
			dateFilter = new Date();
			dateFilter.setDate(dateFilter.getDate() - 7);
		}

		const lastsTasks = await this.prisma.task.findMany({
			where: {
				child: {
					guardian: {
						publicId,
					},
				},
				status: {
					in: ['DONE', 'FAILED'],
				},
				...(dateFilter && {
					updatedAt: {
						gte: dateFilter,
					},
				}),
			},

			orderBy: {
				updatedAt: 'desc',
			},
			include: {
				child: {
					include: {
						user: true,
					},
				},
			},
		});

		return lastsTasks;
	}

	public async childMetrics(childId: number) {
		const donePoints = await this.findChildPoints(childId, 'DONE');
		const failedPoints = await this.findChildPoints(childId, 'FAILED');

		const pointsMap = new Map<
			string,
			{ donePoints: number; failedPoints: number }
		>();

		donePoints.forEach((point) => {
			const dataKey = this.formatDate(point.createdAt);
			const current = pointsMap.get(dataKey) || {
				donePoints: 0,
				failedPoints: 0,
			};
			current.donePoints += point._sum.points;
			pointsMap.set(dataKey, current);
		});

		failedPoints.forEach((point) => {
			const dataKey = this.formatDate(point.createdAt);
			const current = pointsMap.get(dataKey) || {
				donePoints: 0,
				failedPoints: 0,
			};
			current.failedPoints += point._sum.points; // Some os pontos
			pointsMap.set(dataKey, current);
		});

		const points = Array.from(pointsMap.entries())
			.map(([date, { donePoints, failedPoints }]) => ({
				date,
				donePoints,
				failedPoints,
			}))
			.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));

		return points;
	}

	private async findChildPoints(childId: number, status: 'DONE' | 'FAILED') {
		const lastMonth = new Date();
		lastMonth.setMonth(lastMonth.getMonth() - 1); // Mês atual - 1

		return await this.prisma.task.groupBy({
			by: ['createdAt'],
			where: {
				createdAt: {
					gte: new Date(
						new Date().setMonth(new Date().getMonth() - 12),
					),
					lt: lastMonth, // Exclui o mês atual
				},
				childId,
				status,
			},
			_sum: {
				points: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 12, // Pode ser ajustado dependendo de como você quer retornar os dados
		});
	}

	private async findTotalPoints(publicId: string) {
		const totalPoints = await this.prisma.child.groupBy({
			by: 'userGuardianId',
			where: {
				guardian: {
					publicId,
				},
			},
			_sum: {
				points: true,
			},
		});

		return totalPoints[0]._sum.points;
	}

	private async findTotalTasks(publicId: string) {
		const totalTasks = await this.prisma.task.count({
			where: {
				child: {
					guardian: {
						publicId,
					},
				},
			},
		});

		return totalTasks;
	}

	private async findTotalTasksDone(publicId: string) {
		const totalTasks = await this.prisma.task.count({
			where: {
				child: {
					guardian: {
						publicId,
					},
				},
				status: 'DONE',
			},
		});

		return totalTasks;
	}

	private formatDate(date: Date): string {
		const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adiciona 0 à esquerda se necessário
		const year = date.getFullYear();
		return `${month}/${year}`; // Formato "MM/YYYY"
	}
}
