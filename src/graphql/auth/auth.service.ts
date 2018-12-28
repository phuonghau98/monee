import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from '../../dtos/createUserDTO';
import { DatabaseUserService } from '../../database/users.service';
import { DatabaseExtraUserService } from '../../database/user.extraService';
import { LoginInfoDTO } from '../../dtos/LoginInfoDTO';
import { AuthExtraService } from './auth.extraService';
const jwt = require('jsonwebtoken')

@Injectable()
export class GQLAuthService {
  constructor(
    private readonly dbUserService: DatabaseUserService,
    private readonly dbExUserService: DatabaseExtraUserService,
    private readonly AuthExtraService: AuthExtraService
  ) { }
  
  async createUser (user: CreateUserDTO) {
    if (await this.dbExUserService.isUsnExist(user.usn) === false && this.dbExUserService.isInfoValid(user)) {
      const cryptedPwd = await this.dbExUserService.encryptPwd(user.pwd)
      return await this.dbUserService.createUser({...user, pwd: cryptedPwd})
    } else throw new NotAcceptableException('Your informations dont meet the requirements')
  }

  async login (logInfo: LoginInfoDTO) {
    if (await this.dbExUserService.isUsnExist(logInfo.usn)) {
      const searchedUser = await this.dbUserService.getUserByUsername(logInfo.usn)

      if (await this.AuthExtraService.isPwdsIdentical(logInfo.pwd, searchedUser.pwd)) {
        return await {
          token: await this.AuthExtraService.generateToken(searchedUser),
          id: searchedUser.id
        }
      }  else throw new NotAcceptableException('Invalid User')
    } else throw new UnauthorizedException('Invalid User')
  }
}
