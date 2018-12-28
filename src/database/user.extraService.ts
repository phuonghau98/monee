import { Injectable } from '@nestjs/common'
import { DatabaseUserService } from './users.service'
import { CreateUserDTO } from '../dtos/createUserDTO'
import { LoginInfoDTO } from '../dtos/LoginInfoDTO'
const bcrypt = require('bcrypt')

@Injectable()
export class DatabaseExtraUserService {
  constructor (private readonly databaseUserService: DatabaseUserService) { }
  
  async isUsnExist(usn: string = ''): Promise<Boolean> {
    if (usn === null) return false
    const searchResult = await this.databaseUserService.getUserByUsername(usn)
    if(searchResult !== null) return true
    return false
  }

  isInfoValid(user: CreateUserDTO = { usn: null, name: null, pwd: null}): Boolean {
    const validUsnRegEx = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
    const validPwdRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/
    const validNameRegEx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    return validNameRegEx.test(user.name) && validUsnRegEx.test(user.usn) && validPwdRegEx.test(user.pwd)
  }

  async encryptPwd(pwd: string): Promise<String> {
    const cryptSalt = await bcrypt.genSalt(6)
    return await bcrypt.hash(pwd, cryptSalt)
  }

  async getModifiedAccount(code: string, userId: string, isIncrease: boolean, amount: number) {
    const userLookup = await this.databaseUserService.getUserById(userId)
    const currentAccounts = userLookup.accounts
    let result
    switch (code) {
      case 'bank':
        if (isIncrease) result = { ...currentAccounts, bank: currentAccounts.bank + amount}
        else result = { ...currentAccounts, bank: currentAccounts.bank - amount}
        break;
      case 'cc':
        if (isIncrease) result = { ...currentAccounts, cc: currentAccounts.cc + amount}
        else result = { ...currentAccounts, cc: currentAccounts.cc - amount}
        break;
      case 'cash':
        if (isIncrease) result = { ...currentAccounts, cash: currentAccounts.cash + amount}
        else result = { ...currentAccounts, cash: currentAccounts.cash - amount}
        break;
      default:
        result = currentAccounts
    }
    return result
  }
}