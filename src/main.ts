import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import messages from './config/messages/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseInterceptor } from './response/response.interceptor';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.useGlobalInterceptors(new ResponseInterceptor());

	const config = new DocumentBuilder()
		.setTitle(messages.title)
		.setDescription(messages.description)
		.setVersion(messages.version)
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: true,
	});

	await app.listen(5000);
}
bootstrap();
