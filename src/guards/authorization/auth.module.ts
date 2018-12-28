import { Module } from '@nestjs/common'
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../../database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [AuthGuard, AuthService],
  exports: [ AuthService ]
})
export class AuthModule {

}