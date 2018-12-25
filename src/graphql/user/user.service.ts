import { Injectable } from '@nestjs/common';
import { User } from '../graphql.schema';
import { DatabaseUserService } from '../../database/users.service';
@Injectable()
export class UserService {
  constructor(
    private readonly databaseUserService: DatabaseUserService
  ) { }
  async getUser(id: string){
    return await this.databaseUserService.getUserById(id)
  }

  async modifyAccounts(id: string , code: string, amount: number, isIncrease: boolean){
    return await this.databaseUserService.modifyAccounts(id, code, amount, isIncrease)
  }

}
