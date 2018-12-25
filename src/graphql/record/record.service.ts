import { Injectable } from '@nestjs/common';
import { recordsFilterBy, amountSum } from '../../customizeFunctions/records';
import { DatabaseRecordService } from '../../database/records.service';
import { DatabaseUserService } from '../../database/users.service';

@Injectable()
export class RecordService {
  constructor(
    private readonly databaseRecordService: DatabaseRecordService,
    private readonly databaseUserService: DatabaseUserService
  ) {}
  
  async getRecord(userId: string){
    return await this.databaseRecordService.getAllRecordsById(userId)
  }

  async createRecord(payload){
    const date = new Date().toLocaleString()
    const initDescription = [{ content: payload.description, date: date }]
    const resultObject = Object.assign(payload, { date: date, description: initDescription})
    return await this.databaseRecordService.createRecord(resultObject);
  }

  async getStaticsByDate(userId: string) {
    const recordsByUser = await this.getRecord(userId)
    const sumByToday = await recordsFilterBy('today', recordsByUser).reduce(amountSum, 0)
    const sumByThisMonth = await recordsFilterBy('thismonth', recordsByUser).reduce(amountSum, 0)
    const sumByLastMonth = await recordsFilterBy('lastmonth', recordsByUser).reduce(amountSum, 0)
    return {
      today: sumByToday,
      thisMonth: sumByThisMonth,
      lastMonth: sumByLastMonth
    }
  }

  async modifyAccounts(id: string , code: string, amount: number, isIncrease: boolean){
    return await this.databaseUserService.modifyAccounts(id, code, amount, isIncrease)
  }
}
