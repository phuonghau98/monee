import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseUserService } from './users.service'

describe('UserService', () => {
  let service: DatabaseUserService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseUserService],
    }).compile()
    service = module.get<DatabaseUserService>(DatabaseUserService)
  });
  it('should be defined', () => {
    expect(service).toBeDefined()
  });
});
