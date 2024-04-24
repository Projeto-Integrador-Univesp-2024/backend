import { PrismaModule } from './config/database/prisma.module';
import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [PrismaModule, AccountModule, SessionsModule, UserModule],
})
export class AppModule {}
