import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

enum UserTypes {
	ADMIN = 'ADMIN',
	GUARDIAN = 'GUARDIAN',
	CHILD = 'CHILD',
}

export async function UserTypeSeed(
	prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
) {
	try {
		const admin = await prisma.user_type.create({
			data: {
				id: 1,
				name: UserTypes.ADMIN,
			},
		});

		const guardian = await prisma.user_type.create({
			data: {
				id: 2,
				name: UserTypes.GUARDIAN,
			},
		});

		const child = await prisma.user_type.create({
			data: {
				id: 3,
				name: UserTypes.CHILD,
			},
		});

		console.log({ admin, guardian, child });
	} catch (error) {
		console.error(error);
	}
}
