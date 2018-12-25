import { RecordService } from './record.service';
import { AccountService } from '../account/account.service';
export declare class RecordResolver {
    private readonly recordService;
    private readonly accountService;
    constructor(recordService: RecordService, accountService: AccountService);
    getRecordByUserId(userId: any): Promise<any>;
    recordsStaticByTime(userId: string): Promise<void>;
    createRecord(record: any): Promise<any>;
    recordCreated(): {
        subscribe: () => any;
    };
}
