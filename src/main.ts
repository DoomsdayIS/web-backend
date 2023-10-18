import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import Dashboard from 'supertokens-node/recipe/dashboard';
import supertokens from 'supertokens-node';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useGlobalPipes(new ValidationPipe());
  app.setViewEngine('hbs');

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const hbs = require('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cors = require('cors');
  const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  supertokens.init({
    appInfo: {
      apiDomain: 'https://web-backend-spk9.onrender.com',
      appName: 'web-backend',
      websiteDomain: 'https://web-backend-spk9.onrender.com',
    },
    recipeList: [
      // TODO: Initialise other recipes
      Dashboard.init(),
      EmailPassword.init(),
      Session.init(),
    ],
  });

  app.use(cors(corsOptions)); // Use this after the variable declaration
  app.enableCors({
    origin: ['https://web-backend-spk9.onrender.com'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Articles API')
    .setDescription('API')
    .setVersion('0.1')
    .addTag('Article')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT;
  if (port === undefined) {
    await app.listen(3000);
  } else {
    await app.listen(port);
  }
}
bootstrap();
