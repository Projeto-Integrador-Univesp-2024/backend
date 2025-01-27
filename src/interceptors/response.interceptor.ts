import {
	CallHandler,
	ExecutionContext,
	HttpStatus,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((response) => {
				if (!response) {
					return {
						data: null,
						message: 'No content',
						status: HttpStatus.NO_CONTENT,
					};
				}

				// Garante que a resposta tenha um objeto com as propriedades corretas
				return {
					data:
						response.data !== undefined ? response.data : response,
					message: response.message || 'Success',
					status: response.status || HttpStatus.OK,
				};
			}),
		);
	}
}
