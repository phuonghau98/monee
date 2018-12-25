import { Injectable } from '@nestjs/common';
import { CreateUser } from './dtos/createUser.dto';
import { DatabaseUserService } from '../../database/users.service';
import { SECRET_CODE } from 'env';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

@Injectable()
export class GQLAuthService {
  constructor(
    private readonly databaseUserService: DatabaseUserService
  ) { }
  
  async createUser(user: CreateUser) {
    return await this.databaseUserService.createUser(user)
  }

  async login (logInfo) {
    const invalidCaseResponse = {
      token: '',
      status: 403
    }
    const user = await this.databaseUserService.getUserByUsername(logInfo.usn)
    if (user === null ) return invalidCaseResponse
    else {
      const isPwdMatched = await bcrypt.compare(logInfo.pwd, user.pwd)
      if(isPwdMatched){
        const generatedToken = await jwt.sign({
          userId: user.id,
          userUsn: user.usn
        }, SECRET_CODE, {
          expiresIn: '1h'
        })

        const authenticatedSucess = {
          token: generatedToken,
          id: user.id,
          status: 202
        }
        return await authenticatedSucess
      }
    }
    return invalidCaseResponse
  }
}
