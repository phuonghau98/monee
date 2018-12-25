import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { pubSubProvider } from '../PubSubProvider'
import { DatabaseModule } from '../../database/database.module';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule
  ],
  providers: [AuthGuard,UserService, UserResolver, pubSubProvider]
})
export class UserModule {}