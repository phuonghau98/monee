import { NestMongooseUserInterface } from './mongoInterfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUser } from './dtos/createUser.dto';
import { User } from '../graphql.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<NestMongooseUserInterface>);
    getUser(id: string): Promise<any>;
    modifyAccounts(id: string, code: string, amount: number, isIncrease: boolean): Promise<any>;
    createUser(user: CreateUser): Promise<User>;
}
