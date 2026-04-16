import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('BibliotecarioAls API')
    .setDescription('Biblioteca Corporativa - API REST para gestão de acervo e empréstimos')
    .setVersion('0.1.0')
    .addTag('works', 'Gestão de obras (metadados)')
    .addTag('copies', 'Gestão de exemplares (itens físicos)')
    .addTag('loans', 'Gestão de empréstimos e devoluções')
    .addTag('auth', 'Autenticação SAML')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });
};
