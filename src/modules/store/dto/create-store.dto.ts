import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateStoreDto {
	@ApiProperty()
	@IsNumber()
	childId: number;
}
