import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Inject, UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from '../../auth/auth.guard';

@Resolver('User')
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject('Pubsub') private readonly pubSub: PubSub
  ) { }

  @Query()
  async getUser(@Args('id') id: string) {
    return await this.userService.getUser(id)
  }

  @Mutation()
  async modifyAccounts(@Args('id') id, @Args('code') code, @Args('amount') amount, @Args('isIncrease') isIncrease){
    const accountsModified = await this.userService.modifyAccounts(id, code, amount, isIncrease)
    this.pubSub.publish('accountsModified', { accountsModified : accountsModified.accounts });
    return accountsModified
  }

  @Subscription('accountsModified')
  accountsModified(){
    return {
      subscribe: () => this.pubSub.asyncIterator('accountsModified')
    }
  }

}
