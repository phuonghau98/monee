import { NestMongooseRecordInterface } from '../nestMongooseInterfaces/record.interface';
import { Model } from 'mongoose';
export declare class RecordService {
    private readonly recordModel;
    constructor(recordModel: Model<NestMongooseRecordInterface>);
    getRecord(userId: string): Promise<any>;
    createRecord(payload: any): Promise<any>;
    getStaticsByTime(userId: any): Promise<void>;
}
