import { Test, TestingModule } from '@nestjs/testing';
import { KeyRotationService } from './key-rotation.service';

describe('KeyRotationService', () => {
  let service: KeyRotationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyRotationService],
    }).compile();

    service = module.get<KeyRotationService>(KeyRotationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
