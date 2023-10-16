import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Conversor de Moedas')
    .setDescription(
      'O aplicativo de conversão de moedas é uma ferramenta simples e eficiente para ajudá-lo a converter facilmente o valor de uma moeda para outra. Utilizando a API do apilayer.com, garantimos que nossas taxas de câmbio estão sempre atualizadas e precisas. Com uma interface fácil de usar e recursos avançados, nossa aplicação é perfeita para quem precisa lidar com diferentes moedas em suas atividades financeiras diárias',
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('currency')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
