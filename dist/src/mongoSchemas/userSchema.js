"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: String,
    usn: String,
    pwd: String,
    accounts: {
        bank: Number,
        cc: Number,
        cash: Number
    }
});
//# sourceMappingURL=userSchema.js.map