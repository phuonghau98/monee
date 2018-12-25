import { Document } from 'mongoose';
export interface NestMongooseUserInterface extends Document {
    readonly name: string;
    readonly usn: string;
    readonly pwd: string;
}
