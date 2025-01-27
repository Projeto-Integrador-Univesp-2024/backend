import { Controller, Get, Param, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
	constructor(private readonly metricsService: MetricsService) {}

	@Get('/:id')
	public async findMetrics(@Param('id') id: string) {
		return await this.metricsService.metrics(id);
	}

	@Get('/lastTasks/:id')
	public async findLastTasks(
		@Param('id') id: string,
		@Query('filter') filter?: 'all' | 'year' | 'month' | 'week',
	) {
		return await this.metricsService.findLastsTasks(id, filter);
	}

	@Get('/child/:id')
	public async findChildMetrics(@Param('id') id: string) {
		return await this.metricsService.childMetrics(+id);
	}
}
