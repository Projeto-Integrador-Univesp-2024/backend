import {
	Global,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { IUtilsHelper } from './utils.interface';
import { Request } from 'express';

@Global()
@Injectable()
export class UtilsService implements IUtilsHelper {
	public extractTokenFromHeader(request: Request): string | undefined {
		try {
			const [type, token] =
				request.headers.authorization.split(' ') ?? [];

			return type === 'Bearer' ? token : undefined;
		} catch (error) {
			throw new UnauthorizedException();
		}
	}

	public createSlug(name: string): string {
		try {
			return name
				.toLowerCase() // Converte para minúsculas
				.normalize('NFD') // Normaliza a string para decompor caracteres acentuados
				.replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
				.trim() // Remove espaços no início e no final
				.replace(/[^a-z0-9 -]/g, '') // Remove caracteres especiais
				.replace(/\s+/g, '-') // Substitui espaços por hífens
				.replace(/-+/g, '-'); // Remove hífens consecutivos
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.EXPECTATION_FAILED,
				},
				HttpStatus.EXPECTATION_FAILED,
				{
					cause: error,
				},
			);
		}
	}

	public createFileName(name: string, ext: string): string {
		try {
			const date = new Date()
				.toLocaleString('pt-BR')
				.replace(/[:]/g, '_')
				.replace(/[/]/g, '_')
				.replace(/[,]/g, '')
				.replace(/[ ]/g, '-');
			return `${name}_${date}.${ext}`;
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.EXPECTATION_FAILED,
				},
				HttpStatus.EXPECTATION_FAILED,
				{
					cause: error,
				},
			);
		}
	}
}
