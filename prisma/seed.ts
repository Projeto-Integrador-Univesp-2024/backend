import { PrismaClient } from '@prisma/client';
import { UserTypeSeed } from './seeds/userType.seed';

const prisma = new PrismaClient();

async function main() {
	try {
		await UserTypeSeed(prisma);
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
