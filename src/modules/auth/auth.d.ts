import { User } from '@prisma/client';

declare namespace AuthType {
	interface Login {
		accessToken: string;
		refreshToken: string;
		user: User;
	}
}
