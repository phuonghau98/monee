import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { RecordModule } from './record/record.module';
import { UserModule } from './user/user.module';
import { GQLAuthModule } from './auth/auth.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
      definitions: {
        path: join(process.cwd(), 'src/graphql/graphql.schema.ts'),
        outputAs: 'class'
      }
    }),
    RecordModule,
    UserModule,
    GQLAuthModule
  ]
})
export class GraphqlModule {}
