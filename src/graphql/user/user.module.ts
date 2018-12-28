import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { pubSubProvider } from '../PubSubProvider'
import { DatabaseModule } from '../../database/database.module';
import { AuthGuard } from '../../guards/authorization/auth.guard';
import { AuthModule } from '../../guards/authorization/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule
  ],
  providers: [AuthGuard,UserService, UserResolver, pubSubProvider]
})
export class UserModule {}