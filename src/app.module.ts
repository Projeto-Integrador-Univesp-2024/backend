import { PrismaModule } from './config/database/prisma.module';
import { Module } from '@nestjs/common';
import { SessionModule } from './modules/session/session.module';
import { UserModule } from './modules/user/user.module';
import { ChildModule } from './modules/child/child.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { TaskModule } from './modules/task/task.module';
import { UtilsModule } from './config/utils.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { GlobalJwtModule } from './global-jwt/global-jwt.module';
import configuration from './config/configuration';
import { GoalModule } from './modules/goal/goal.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { TaskTypeModule } from './modules/task-type/task-type.module';
import { ProductModule } from './modules/product/product.module';
import { StoreModule } from './modules/store/store.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		GlobalJwtModule,
		JwtModule,
		PrismaModule,
		MailModule,
		SessionModule,
		UserModule,
		ChildModule,
		AuthModule,
		TaskModule,
		UtilsModule,
		GoalModule,
		MetricsModule,
		TaskTypeModule,
		ProductModule,
		StoreModule,
	],
})
export class AppModule {}
