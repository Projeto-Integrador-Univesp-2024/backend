import { ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsEnum,
	IsInt,
	IsString,
	MaxLength,
} from 'class-validator';
import { StatusEnum } from '../task.enum';

export class CreateTaskDto {
	@ApiProperty()
	@IsInt()
	childId: number;

	@ApiProperty()
	@IsString()
	@MaxLength(100)
	name: string;

	@ApiProperty()
	@IsInt()
	taskTypeId: number;

	@ApiProperty()
	@IsEnum(StatusEnum)
	status: Task.Status;

	@ApiProperty()
	@IsInt()
	points: number;

	@ApiProperty()
	@IsDateString()
	deadline: string;
}
