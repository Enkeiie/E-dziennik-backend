import { Test, TestingModule } from '@nestjs/testing';
import { AssignedTestsService } from './assigned-tests.service';

describe('AssignedTestsService', () => {
  let service: AssignedTestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignedTestsService],
    }).compile();

    service = module.get<AssignedTestsService>(AssignedTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
