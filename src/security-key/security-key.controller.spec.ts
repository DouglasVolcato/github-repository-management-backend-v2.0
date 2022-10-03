import { Test, TestingModule } from '@nestjs/testing';
import { SecurityKeyController } from './security-key.controller';

describe('SecurityKeyController', () => {
  let controller: SecurityKeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecurityKeyController],
    }).compile();

    controller = module.get<SecurityKeyController>(SecurityKeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
