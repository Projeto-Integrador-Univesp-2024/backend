import { Request } from 'express';

export interface IUtilsHelper {
	extractTokenFromHeader(request: Request): string | undefined;
	createSlug(label: string): string;
	createFileName(name: string, ext: string): string;
}
