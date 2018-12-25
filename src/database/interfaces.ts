import { Document } from 'mongoose'
class Description{
  content: string;
  date: string;
}
export interface RecordInterface extends Document{
  id: string;
  belongsTo: string;
  tag: string;
  date: string;
  method: string;
  description: Description[];
  amount: number;
}

export interface UserInterface extends Document{
  readonly name: string;
  readonly usn: string;
  readonly pwd: string;
}