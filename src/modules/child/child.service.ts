import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class ChildService {
	constructor(private readonly prisma: PrismaService) {}

	create(_createChildDto: CreateChildDto) {
		return this.prisma.child.create({
			data: _createChildDto,
		});
	}

	findAll() {
		return this.prisma.child.findMany();
	}

	findOne(id: number) {
		return this.prisma.child.findFirstOrThrow({
			where: {
				id,
			},
		});
	}

	update(id: number, _updateChildDto: UpdateChildDto) {
		return this.prisma.child.update({
			where: {
				id,
			},
			data: _updateChildDto,
		});
	}

	remove(id: number) {
		return this.prisma.child.delete({
			where: {
				id,
			},
		});
	}
}
