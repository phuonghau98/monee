"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.RecordSchema = new mongoose.Schema({
    belongsTo: String,
    tag: String,
    date: String,
    method: String,
    description: [{
            content: String,
            date: String
        }],
    amount: Number
});
//# sourceMappingURL=recordSchemas.js.map