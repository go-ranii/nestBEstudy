import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
  id: string;
  email: string;
  sub: string;
  exp: number;
}

export const CurrentUser = createParamDecorator(
  (_: any, context: ExecutionContext): ICurrentUser => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.user;
  },
);
