"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const record_service_1 = require("./record.service");
const record_resolver_1 = require("./record.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const recordSchemas_1 = require("./mongoSchemas/recordSchemas");
const account_module_1 = require("../account/account.module");
let RecordModule = class RecordModule {
};
RecordModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Record', schema: recordSchemas_1.RecordSchema }]),
            account_module_1.AccountModule
        ],
        providers: [record_service_1.RecordService, record_resolver_1.RecordResolver]
    })
], RecordModule);
exports.RecordModule = RecordModule;
//# sourceMappingURL=record.module.js.map