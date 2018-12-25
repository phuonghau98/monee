import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    getUser(id: string): Promise<any>;
    createUser(user: any): Promise<import("../graphql.schema").User>;
    modifyAccounts(id: any, code: any, amount: any, isIncrease: any): Promise<any>;
    accountsModified(): {
        subscribe: () => any;
    };
}
