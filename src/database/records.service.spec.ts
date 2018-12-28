import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseRecordService } from './records.service'

describe('DatabaseService', () => {
  let service: DatabaseRecordService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseRecordService],
    }).compile();
    service = module.get<DatabaseRecordService>(DatabaseRecordService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
