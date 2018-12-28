import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql'
import { RecordService } from './record.service'
import { PubSub } from 'graphql-subscriptions'
import { Inject, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../../guards/authorization/auth.guard'
import { withFilter } from 'apollo-server'


@Resolver('Record')
// @UseGuards(AuthGuard)
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
    
    this.pubSub.publish('accountsModified', { accountsModified : accountsModified.accounts, userId: record.belongsTo });
    this.pubSub.publish('recordCreated', { recordCreated : createdRecord });

    return createdRecord
  }

  @Mutation()
  async deleteRecord(@Args('recordId') recordId) {
    return await this.recordService.deleteRecordById(recordId)
  }
  
  @Subscription('recordCreated')
  recordCreated(){
    return {
      subscribe: withFilter(() => this.pubSub.asyncIterator('recordCreated'), (payload, variables) => {
        return payload.recordCreated.belongsTo === variables.userId
      })
    }
  }
  
}
