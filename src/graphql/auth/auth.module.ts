import { Module } from '@nestjs/common'
import { GQLAuthService } from './auth.service'
import { GQLAuthResolver } from './auth.resolver'
import { DatabaseModule } from '../../database/database.module'
import { AuthExtraService } from './auth.extraService'

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [ GQLAuthService, GQLAuthResolver, AuthExtraService ]
})

export class GQLAuthModule {}