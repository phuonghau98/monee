import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { RecordService } from './record.service';
import { PubSub } from 'graphql-subscriptions'
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';

@Resolver('Record')
export class RecordResolver {

  constructor(
    private readonly recordService: RecordService,
    @Inject('Pubsub') private readonly pubSub: PubSub
  ) {}

  @Query()
  async getRecordByUserId(@Args('userId') userId: string){
    return await this.recordService.getRecord(userId)
  }

  @Query()
  async recordsStaticByDate(@Args('userId') userId: string){
    return await this.recordService.getStaticsByDate(userId)
  }
  @Mutation()
  async createRecord(@Args('record') record) {
    const createdRecord = await this.recordService.createRecord(record);
    const accountsModified = await this.recordService.modifyAccounts(record.belongsTo, record.method, record.amount, false)
    
    this.pubSub.publish('accountsModified', { accountsModified : accountsModified.accounts });
    this.pubSub.publish('recordCreated', { recordCreated : createdRecord });
    
    return createdRecord
  }

  @Subscription('recordCreated')
  recordCreated(){
    return {
      subscribe: () => this.pubSub.asyncIterator('recordCreated')
    }
  }
  
}
