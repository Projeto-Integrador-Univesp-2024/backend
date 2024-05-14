import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ChildModule } from '../child/child.module';
import { AccountModule } from '../account/account.module';
import { JwtService } from '@nestjs/jwt';

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtService],
	imports: [UserModule, AccountModule, ChildModule],
})
export class AuthModule {}
