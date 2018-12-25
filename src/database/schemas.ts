import * as mongoose from 'mongoose'

export const RecordSchema = new mongoose.Schema({
  belongsTo: String,
  tag: String,
  date: String,
  method: String,
  description: [{
    content: String,
    date: String
  }],
  amount: Number
})

export const UserSchema = new mongoose.Schema({
  name: String,
  usn: String,
  pwd: String,
  accounts: {
    bank: Number,
    cc: Number,
    cash: Number
  }
})