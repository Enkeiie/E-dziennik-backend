import { Test, TestingModule } from '@nestjs/testing';
import { ParentsChildrenService } from './parents-children.service';

describe('ParentsChildrenService', () => {
  let service: ParentsChildrenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParentsChildrenService],
    }).compile();

    service = module.get<ParentsChildrenService>(ParentsChildrenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
