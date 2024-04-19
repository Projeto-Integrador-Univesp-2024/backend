import { PrismaModule } from './config/database/prisma.module';
import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { SessionsModule } from './modules/sessions/sessions.module';

@Module({
	imports: [PrismaModule, AccountModule, SessionsModule],
})
export class AppModule {}
