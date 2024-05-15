import { PrismaModule } from './config/database/prisma.module';
import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { UserModule } from './modules/user/user.module';
import { ChildModule } from './modules/child/child.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
	imports: [
		PrismaModule,
		MailModule,
		AccountModule,
		SessionsModule,
		UserModule,
		ChildModule,
		AuthModule,
	],
})
export class AppModule {}
