export class CreateUserDto {
    name?: string;
    usn?: string;
    pwd?: string;
}

export class InputRecord {
    belongsTo?: string;
    tag?: string;
    method?: string;
    description?: string;
    amount?: number;
}

export class LogInfo {
    usn?: string;
    pwd?: string;
}

export class ModifyAccountsPayload {
    bank?: number;
    cc?: number;
    cash?: number;
}

export class Accounts {
    bank?: number;
    cc?: number;
    cash?: number;
}

export class AuthenInfo {
    token?: string;
    id?: string;
}

export class Description {
    content?: string;
    date?: string;
}

export abstract class IMutation {
    abstract createUser(user?: CreateUserDto): User | Promise<User>;

    abstract editDescription(recordId?: string, userId?: string): Record | Promise<Record>;

    abstract createRecord(record?: InputRecord): Record | Promise<Record>;

    abstract deleteRecord(recordId?: string): Record | Promise<Record>;

    abstract modifyAccounts(id?: string, code?: string, amount?: number, isIncrease?: boolean): Accounts | Promise<Accounts>;
}

export abstract class IQuery {
    abstract login(logInfo?: LogInfo): AuthenInfo | Promise<AuthenInfo>;

    abstract getRecordByUserId(userId?: string): Record[] | Promise<Record[]>;

    abstract recordsStaticByDate(userId?: string): StaticsByTime | Promise<StaticsByTime>;

    abstract getUser(id?: string): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Record {
    id?: string;
    belongsTo?: string;
    tag?: string;
    date?: string;
    method?: string;
    description?: Description[];
    amount?: number;
}

export class StaticsByTime {
    today?: number;
    thisMonth?: number;
    lastMonth?: number;
}

export abstract class ISubscription {
    abstract recordCreated(userId?: string): Record | Promise<Record>;

    abstract accountsModified(userId: string): Accounts | Promise<Accounts>;
}

export class User {
    id?: string;
    name?: string;
    usn?: string;
    pwd?: string;
    accounts?: Accounts;
    status?: number;
}
