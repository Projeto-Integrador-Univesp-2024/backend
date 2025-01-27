import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ChildModule } from '../child/child.module';
import { JwtService } from '@nestjs/jwt';
import { SessionModule } from '../session/session.module';

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtService],
	imports: [UserModule, ChildModule, SessionModule],
})
export class AuthModule {}
