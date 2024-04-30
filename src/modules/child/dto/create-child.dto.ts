import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateChildDto {
	@ApiProperty()
	@IsInt()
	userId: number;

	@ApiProperty()
	@IsInt()
	points: number;
}
