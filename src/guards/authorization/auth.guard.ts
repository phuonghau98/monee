import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';
const jwt = require('jsonwebtoken')

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private readonly authService: AuthService) { }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context)
        const req = await ctx.getContext().req
        const idArg = await ctx.getArgs().id
        const authorizationHeader = await req.headers.authorization
        return await this.authService.validate(authorizationHeader, idArg)
  }
}