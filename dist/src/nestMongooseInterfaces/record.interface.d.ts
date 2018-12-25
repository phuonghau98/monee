import { Document } from 'mongoose';
declare class Description {
    content: string;
    date: string;
}
export interface NestMongooseRecordInterface extends Document {
    id: string;
    belongsTo: string;
    tag: string;
    date: string;
    method: string;
    description: Description[];
    amount: number;
}
export {};
