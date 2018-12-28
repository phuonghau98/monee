import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './schemas'
import { RecordSchema } from './schemas'
import { DatabaseUserService } from './users.service'
import { DatabaseRecordService } from './records.service'
import { DatabaseExtraUserService } from './user.extraService'
import { DatabaseExtraRecordService } from './records.extraService'
import { MONGO_ENDPOINT } from 'env'

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_ENDPOINT),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Record', schema: RecordSchema }])
  ],
  providers: [ DatabaseUserService, DatabaseRecordService, DatabaseExtraUserService, DatabaseExtraRecordService ],
  exports: [ DatabaseRecordService, DatabaseUserService, DatabaseExtraUserService, DatabaseExtraRecordService ]
})

export class DatabaseModule { }
