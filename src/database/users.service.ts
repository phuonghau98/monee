import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserInterface } from './interfaces'
const bcrypt = require('bcrypt')

@Injectable()
export class DatabaseUserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>){ }

  async getUserById(id: string){
    return await this.userModel.findById(id).exec()
  }
   
  async getUserByUsername(usn: string){
    return await this.userModel.findOne({ usn: usn}).exec()
  }
  async createUser(user) {
    const cryptSalt = await bcrypt.genSalt(6)
    const cryptedPwd = await bcrypt.hash(user.pwd, cryptSalt)
    const createdUser = new this.userModel(Object.assign({}, user, { pwd: cryptedPwd }, { accounts: { bank: 0, cc: 0, cash: 0}}))
    await createdUser.save();
    return { ...createdUser, status: 203}
  }
  
  async modifyAccounts(id: string , code: string, amount: number, isIncrease: boolean){

    let payloadObject

    const userLookup = await this.userModel.findById(id).exec();
    const currentAccounts = userLookup.accounts

    if(code === 'bank' ) { 
      if(isIncrease) payloadObject = await { 'accounts.bank' : currentAccounts.bank + amount }
      else payloadObject = await { 'accounts.bank' : currentAccounts.bank - amount }
    }
    if(code === 'cc' ) { 
      if(isIncrease) payloadObject = await { 'accounts.cc' : currentAccounts.cc + amount }
      else payloadObject = await { 'accounts.cc' : currentAccounts.cc - amount }
    }
    if(code === 'cash' ) { 
      if(isIncrease) payloadObject = await { 'accounts.cash' : currentAccounts.cash + amount }
      else payloadObject = await { 'accounts.cash' : currentAccounts.cash - amount }
    }

    const modifiedAccount = await this.userModel.findOneAndUpdate({ _id: id}, { $set: payloadObject }, { new: true})
    return modifiedAccount

  }
}
