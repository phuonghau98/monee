import { Module } from '@nestjs/common'
import { RecordService } from './record.service'
import { RecordResolver } from './record.resolver'
import { pubSubProvider } from '../PubSubProvider'
import { DatabaseModule } from '../../database/database.module'
import { AuthModule } from '../../guards/authorization/auth.module'

@Module({
  imports: [
    DatabaseModule, AuthModule
  ],
  providers: [ RecordService, RecordResolver, pubSubProvider ]
})
export class RecordModule {}
