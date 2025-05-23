import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if(err || !user) throw err || new UnauthorizedException();
        
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            user.token = token;
        }
        
        return user;
    }
}
