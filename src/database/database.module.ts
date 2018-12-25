import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas'
import { RecordSchema } from './schemas'
import { DatabaseUserService } from './users.service';
import { DatabaseRecordService } from './records.service';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/monee'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{ name: 'Record', schema: RecordSchema}])
  ],
  providers: [DatabaseUserService, DatabaseRecordService],
  exports: [DatabaseRecordService, DatabaseUserService]
})
export class DatabaseModule {}
