import { Injectable } from '@nestjs/common'
import { User } from '../graphql.schema'
import { DatabaseUserService } from '../../database/users.service'
import { DatabaseExtraUserService } from '../../database/user.extraService'
@Injectable()
export class UserService {
  constructor(
    private readonly databaseUserService: DatabaseUserService,
    private readonly dbExUserService: DatabaseExtraUserService
  ) { }
  async getUser (id: string) {
    return await this.databaseUserService.getUserById(id)
  }

  async modifyAccounts (userId: string , code: string, amount: number, isIncrease: boolean) {
    const modifiedPayload = await this.dbExUserService.getModifiedAccount(code, userId, isIncrease, amount)
    return await this.databaseUserService.modifyAccounts(userId, modifiedPayload)
  }

}
