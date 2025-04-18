// src/auth/decorators/auth-user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/entities/user.entity'; // Adjust path

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    let user = request.user;
    user['token'] = authHeader && authHeader.split(' ')[1];
    delete user['roles']
    return user;
  },
);
