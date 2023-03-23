import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FILE_SERVER',
        transport: Transport.TCP,
        options: {
          port: 3030,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
