"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const record_service_1 = require("./record.service");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const account_service_1 = require("../account/account.service");
const pubSub = new graphql_subscriptions_1.PubSub();
let RecordResolver = class RecordResolver {
    constructor(recordService, accountService) {
        this.recordService = recordService;
        this.accountService = accountService;
    }
    getRecordByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recordService.getRecord(userId);
        });
    }
    recordsStaticByTime(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.recordService.getStaticsByTime(userId);
        });
    }
    createRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdRecord = yield this.recordService.createRecord(record);
            const accountsModified = yield this.accountService.modifyAccounts(record.belongsTo, record.method, record.amount, false);
            pubSub.publish('accountsModified', { accountsModified: accountsModified.accounts });
            pubSub.publish('recordCreated', { recordCreated: createdRecord });
            return createdRecord;
        });
    }
    recordCreated() {
        return {
            subscribe: () => pubSub.asyncIterator('recordCreated')
        };
    }
};
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecordResolver.prototype, "getRecordByUserId", null);
__decorate([
    graphql_1.Query(),
    __param(0, graphql_1.Args('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordResolver.prototype, "recordsStaticByTime", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, graphql_1.Args('record')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecordResolver.prototype, "createRecord", null);
__decorate([
    graphql_1.Subscription('recordCreated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecordResolver.prototype, "recordCreated", null);
RecordResolver = __decorate([
    graphql_1.Resolver('Record'),
    __metadata("design:paramtypes", [record_service_1.RecordService,
        account_service_1.AccountService])
], RecordResolver);
exports.RecordResolver = RecordResolver;
//# sourceMappingURL=record.resolver.js.map