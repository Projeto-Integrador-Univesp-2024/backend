import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import emailMessage from '../../config/messages/email';

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async enviarOtp(email: string, otp: string) {
		await this.mailerService.sendMail({
			to: email,
			subject: emailMessage.otp.subject,
			template: 'otp',
			context: {
				pin: otp,
			},
		});
	}

	async enviarEmail(email: string, mensagem: string, subject?: string) {
		await this.mailerService.sendMail({
			to: email,
			subject: subject,
			template: mensagem,
		});
	}
}
