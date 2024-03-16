import { PrismaModule } from './config/database/prisma.module';
import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';

@Module({
	imports: [PrismaModule, AccountModule],
})
export class AppModule {}
