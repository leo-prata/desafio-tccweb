import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function start() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		})
	);

	app.enableCors({
		origin: [
			'http://localhost:5173',
			'http://localhost:4173',
			'http://localhost:8081',
		],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	});

	await app.listen(process.env.PORT ?? 3111);
}
start();
