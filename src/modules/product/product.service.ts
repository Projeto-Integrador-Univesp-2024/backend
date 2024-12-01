import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	public async create(_createProductDto: CreateProductDto) {
		return await this.prisma.product.create({
			data: _createProductDto,
		});
	}

	public async findAll(publicId: string) {
		return await this.prisma.product.findMany({
			where: {
				guardian: {
					publicId,
				},
			},
			include: {
				productStore: {
					include: {
						store: {
							include: {
								child: {
									include: {
										user: true,
									},
								},
							},
						},
					},
				},
			},
		});
	}

	public async findOne(publicId: string) {
		return await this.prisma.product.findUnique({
			where: {
				publicId,
			},
		});
	}

	public async findAllByChild(publicId: string) {
		return await this.prisma.product.findMany({
			where: {
				productStore: {
					some: {
						store: {
							child: {
								user: {
									publicId,
								},
							},
						},
						stock: {
							gte: 1,
						},
					},
				},
			},
		});
	}

	public async update(id: number, _updateProductDto: UpdateProductDto) {
		return await this.prisma.product.update({
			where: {
				id,
			},
			data: _updateProductDto,
		});
	}

	public async remove(id: number) {
		return await this.prisma.product.update({
			where: {
				id,
			},
			data: {
				deletedAt: new Date(),
			},
		});
	}
}
