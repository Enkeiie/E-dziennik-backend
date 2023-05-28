import { Test, TestingModule } from '@nestjs/testing';
import { AssignedTestsController } from './assigned-tests.controller';
import { AssignedTestsService } from './assigned-tests.service';

describe('AssignedTestsController', () => {
  let controller: AssignedTestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignedTestsController],
      providers: [AssignedTestsService],
    }).compile();

    controller = module.get<AssignedTestsController>(AssignedTestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
