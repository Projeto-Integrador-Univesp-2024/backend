import { PrismaClient } from '@prisma/client';
import { UserTypes } from 'src/enums/userType';

const prisma = new PrismaClient();

async function main() {
	try {
		const admin = await prisma.userType.create({
			data: {
				name: UserTypes.ADMIN,
			},
		});

		const guardian = await prisma.userType.create({
			data: {
				name: UserTypes.GUARDIAN,
			},
		});

		const child = await prisma.userType.create({
			data: {
				name: UserTypes.CHILD,
			},
		});

		console.log({ admin, guardian, child });
	} catch (error) {
		console.error(error);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
