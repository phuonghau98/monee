import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { RecordInterface } from './interfaces'
@Injectable()
export class DatabaseRecordService {
  
  constructor(@InjectModel('Record') private readonly recordModel: Model<RecordInterface>){}

  async getAllRecordsById (userId: string) {
    const results = await this.recordModel.find({ belongsTo: userId }) || []
    return await results.reverse()
  }

  async createRecord (newRecord) {
    const createdRecord = new this.recordModel(newRecord)
    return await createdRecord.save()
  }

  async deleteRecordById (recordId: string) {
    return await this.recordModel.deleteOne({ _id: recordId })
  }
}
