import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MyValidationPipe } from './auth/pipe/validation.pipe';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 4000;
    //app.useGlobalPipes(new ValidationPipe());
    app.useGlobalPipes(new MyValidationPipe());
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('User-role Project')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NestJS, Postgress, Sequielize')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);


    await app.listen(PORT, () => {
      console.log(`Server  listening on ${PORT}`);
      
    })
  } catch (error) {
    console.log(error);
  }
}

start();
