import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

@Global()
@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				service: 'Mailgun',
				host: 'smtp.mailgun.org',
				secure: false,
				port: 587,
				auth: {
					user: 'postmaster@sandboxf827fdadd1854a239ef359548ea8fe0f.mailgun.org',
					pass: '619cba37f8031e4a447bd0853dfb8d3b-ed54d65c-fc00d476',
				},
				ignoreTLS: true,
			},
			defaults: {
				from: '"No Reply" <23215846@aluno.univesp.br>',
			},
			template: {
				dir: join(__dirname, './templates'),
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
