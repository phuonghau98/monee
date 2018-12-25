import { Module } from '@nestjs/common';
import { GQLAuthService } from './auth.service';
import { GQLAuthResolver } from './auth.resolver';
import { DatabaseModule } from '../../database/database.module';
@Module({
  imports: [
    DatabaseModule
  ],
  providers: [GQLAuthService, GQLAuthResolver]
})
export class GQLAuthModule {}