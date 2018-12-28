import { Injectable } from '@nestjs/common'
import { amountSum } from './record.customizeFuncs'
import { DatabaseRecordService } from '../../database/records.service'
import { DatabaseUserService } from '../../database/users.service'
import { DatabaseExtraUserService } from '../../database/user.extraService'
import { DatabaseExtraRecordService } from '../../database/records.extraService'

@Injectable()
export class RecordService {
  constructor(
    private readonly databaseRecordService: DatabaseRecordService,
    private readonly databaseUserService: DatabaseUserService,
    private readonly dbExUserService: DatabaseExtraUserService,
    private readonly dbExRecordService: DatabaseExtraRecordService
  ) {}
  
  async getRecord (userId: string) {
    return await this.databaseRecordService.getAllRecordsById(userId)
  }

  async createRecord (payload) {
    const date = new Date().toLocaleString()
    const initDescription = [{ content: payload.description, date: date }]
    const resultObject = Object.assign(payload, { date: date, description: initDescription})
    return await this.databaseRecordService.createRecord(resultObject);
  }

  async deleteRecordById (recordId: string) { 
    return await this.databaseRecordService.deleteRecordById(recordId)
  }
  
  async getStaticsByDate(userId: string) {
    const recordsByUser = await this.getRecord(userId)
    const todayRecords = await this.dbExRecordService.recordsFilterBy('today', recordsByUser)
    const thisMonthRecords = await this.dbExRecordService.recordsFilterBy('thismonth', recordsByUser)
    const lastMonthRecords = await this.dbExRecordService.recordsFilterBy('lastmonth', recordsByUser)
    return {
      today: todayRecords.reduce(amountSum, 0),
      thisMonth: thisMonthRecords.reduce(amountSum, 0),
      lastMonth: lastMonthRecords.reduce(amountSum, 0)
    }
  }
  
  async modifyAccounts(userId: string , code: string, amount: number, isIncrease: boolean){
    const modifiedPayload = await this.dbExUserService.getModifiedAccount(code, userId, isIncrease, amount)
    return await this.databaseUserService.modifyAccounts(userId, modifiedPayload)
  }
}
