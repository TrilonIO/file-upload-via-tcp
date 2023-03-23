import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { TcpServerModule } from './tcp-server.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TcpServerModule, {
    transport: Transport.TCP,
    options: {
      port: 3030,
    },
  });
  await app.listen();
}
bootstrap();
