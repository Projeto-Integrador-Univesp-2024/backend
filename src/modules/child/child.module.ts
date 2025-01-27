import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { ChildController } from './child.controller';
import { UserModule } from '../user/user.module';
import { StoreModule } from '../store/store.module';

@Module({
	controllers: [ChildController],
	providers: [ChildService],
	imports: [UserModule, StoreModule],
	exports: [ChildService],
})
export class ChildModule {}
