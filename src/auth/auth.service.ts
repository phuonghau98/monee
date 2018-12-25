import { Injectable } from '@nestjs/common'
import { DatabaseUserService } from '../database/users.service';
import  { SECRET_CODE } from '../../env'
const jwt = require('jsonwebtoken')

@Injectable()
export class AuthService {
    constructor (private readonly databaseUserService: DatabaseUserService) {}
    
    async validate(authorizationHeader, idArg) {
      if(authorizationHeader === undefined) return false
      const token = authorizationHeader.split(' ')[1]
      const decoded = jwt.verify(token, SECRET_CODE);
      const user = await this.databaseUserService.getUserById(decoded.userId)
      if(user.id === decoded.userId && idArg === decoded.userId) return true
      return false
    }
}