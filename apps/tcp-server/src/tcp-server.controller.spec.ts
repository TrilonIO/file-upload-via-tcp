import { Test, TestingModule } from '@nestjs/testing';
import { TcpServerController } from './tcp-server.controller';
import { TcpServerService } from './tcp-server.service';

describe('TcpServerController', () => {
  let tcpServerController: TcpServerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TcpServerController],
      providers: [TcpServerService],
    }).compile();

    tcpServerController = app.get<TcpServerController>(TcpServerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(tcpServerController.getHello()).toBe('Hello World!');
    });
  });
});
