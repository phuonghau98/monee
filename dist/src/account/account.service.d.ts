import { NestMongooseUserInterface } from '../user/mongoInterfaces/user.interface';
import { Model } from 'mongoose';
export declare class AccountService {
    private readonly userModel;
    constructor(userModel: Model<NestMongooseUserInterface>);
    modifyAccounts(id: string, code: string, amount: number, isIncrease: boolean): Promise<any>;
}
