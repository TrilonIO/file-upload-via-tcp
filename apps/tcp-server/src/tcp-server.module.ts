import { Module } from '@nestjs/common';
import { TcpServerController } from './tcp-server.controller';
import { TcpServerService } from './tcp-server.service';

@Module({
  imports: [],
  controllers: [TcpServerController],
  providers: [TcpServerService],
})
export class TcpServerModule {}
