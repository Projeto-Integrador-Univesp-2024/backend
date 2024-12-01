import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsInt,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateChildDto extends CreateUserDto {
	@ApiProperty()
	@IsString()
	@IsUUID()
	guardianId: string;

	@ApiProperty()
	@IsInt()
	@IsOptional()
	points?: number;

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	tasksNeedsApproval: boolean;
}
