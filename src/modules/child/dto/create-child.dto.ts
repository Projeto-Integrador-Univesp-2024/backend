import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class CreateChildDto {
	@ApiProperty()
	@IsInt()
	userId: number;

	@ApiProperty()
	@IsInt()
	@IsOptional()
	points?: number;
}
