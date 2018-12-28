import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserInterface } from './interfaces'
import { DatabaseExtraUserService } from './user.extraService'
const bcrypt = require('bcrypt')

@Injectable()
export class DatabaseUserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>
  ){ }

  async getUserById (id: string) {
    return await this.userModel.findById(id).exec()
  }
   
  async getUserByUsername (usn: string) {
    return await this.userModel.findOne({ usn: usn}).exec()
  }
  async createUser (user) {
    const createdUser = new this.userModel({ ...user, accounts: { bank: 0, cc: 0, cash: 0 } })
    return await createdUser.save()
  }
  
  async modifyAccounts (userId, payloadObject) {
    const modifiedAccount = await this.userModel.findOneAndUpdate({ _id: userId}, { $set: { accounts: payloadObject } }, { new: true })
    return modifiedAccount
  }
}
