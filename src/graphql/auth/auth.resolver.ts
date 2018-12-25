import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GQLAuthService } from './auth.service';

@Resolver('Auth')
export class GQLAuthResolver {
  constructor(
    private readonly authService: GQLAuthService
  ) { }

  @Query()
  async login (@Args('logInfo') logInfo) {
    return await this.authService.login(logInfo)
  }

  @Mutation()
  async createUser(@Args('user') user){
    return await this.authService.createUser(user)
  }

}