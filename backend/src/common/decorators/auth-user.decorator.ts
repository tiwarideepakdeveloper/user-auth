import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TblUser } from '../../users/entities/user.entity'; // Adjust path

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TblUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
