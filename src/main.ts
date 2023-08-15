import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe({}))
  app.enableVersioning({ type: VersioningType.URI })

  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Backend Dev')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
