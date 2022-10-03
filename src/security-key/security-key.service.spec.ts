import { Test, TestingModule } from '@nestjs/testing';
import { SecurityKeyService } from './security-key.service';

describe('SecurityKeyService', () => {
  let service: SecurityKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecurityKeyService],
    }).compile();

    service = module.get<SecurityKeyService>(SecurityKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
