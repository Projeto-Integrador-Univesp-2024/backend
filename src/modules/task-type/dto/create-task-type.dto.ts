import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, IsUUID } from 'class-validator';
import { RecurrenceTypeEnum, TaskTypeColorEnum } from '../task-type.enum';

export class CreateTaskTypeDto {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsInt()
	recurrence: number;

	@ApiProperty()
	@IsEnum(RecurrenceTypeEnum)
	recurrenceType: Task.RecurrenceType;

	@ApiProperty()
	@IsEnum(TaskTypeColorEnum)
	color: string;

	@ApiProperty()
	@IsUUID()
	guardianId: string;
}
