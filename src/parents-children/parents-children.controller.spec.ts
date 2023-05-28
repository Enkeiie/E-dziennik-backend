import { Test, TestingModule } from '@nestjs/testing';
import { ParentsChildrenController } from './parents-children.controller';
import { ParentsChildrenService } from './parents-children.service';

describe('ParentsChildrenController', () => {
  let controller: ParentsChildrenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParentsChildrenController],
      providers: [ParentsChildrenService],
    }).compile();

    controller = module.get<ParentsChildrenController>(ParentsChildrenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
