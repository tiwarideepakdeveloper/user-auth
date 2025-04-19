# 📘 NestJS Advanced Authentication – Full Notes

> **Last Updated:** 2025-04-06

---

## 🚀 1. Project Setup

- Framework: **NestJS**
- DB: **MySQL**
- Features: JWT Auth, Role-based Access, Multiple Strategies
- Goal: Full auth system for user/admin with advanced best practices

---

## 🛠 2. MySQL Config & AppModule

**TypeORM Setup:**

```ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'teamcollab',
  autoLoadEntities: true,
  synchronize: true,
});
```

---

## 👤 3. User Module & Entity

**User Entity:**

```ts
@Entity()
export class User {
  \@PrimaryGeneratedColumn()
  id: number;

  \@Column({ unique: true })
  email: string;

  \@Column()
  password: string;

  \@Column({ default: 'user' })
  role: 'user' | 'admin';
}
```

---

## ✉️ 4. DTOs & Response Classes

**Login DTO:**

```ts
export class LoginDto {
  \@IsEmail()
  email: string;

  \@IsString()
  password: string;
}
```

**Response DTO:**

```ts
export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
```

---

## 🔑 5. JWT Strategy (User)

```ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
```

---

## 🛡 6. Guards

**JwtAuthGuard:**

```ts
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

**AdminAuthGuard (using another strategy):**

```ts
export class AdminAuthGuard extends AuthGuard('admin-jwt') {}
```

**RolesGuard (based on role):**

```ts
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest().user;
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    return requiredRoles.includes(user.role);
  }
}
```

---

## 🔐 7. Multiple Strategies (User/Admin)

**Admin JWT Strategy:**

```ts
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('ADMIN_JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    if (payload.role !== 'admin') {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
```

---

## 👤 8. CurrentUser Decorator

```ts
export const CurrentUser = createParamDecorator(
  (_data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
```

---

## 📡 9. Controller Usage

```ts
\@UseGuards(JwtAuthGuard)
\@Get('profile')
getProfile(@CurrentUser() user) {
  return user;
}

\@UseGuards(AdminAuthGuard)
\@Get('admin/dashboard')
getAdminDashboard(@CurrentUser() user) {
  return user;
}
```

---

## 🧱 10. Folder Structure

```
src/
├── auth/
│   ├── strategies/
│   ├── guards/
│   ├── decorators/
│   ├── dtos/
│   └── auth.module.ts
├── user/
│   └── user.controller.ts
├── common/
├── app.module.ts
```

---

## 🔁 11. Summary Tables

| Component       | Purpose                                |
|----------------|-----------------------------------------|
| JwtStrategy     | Validates token, injects user          |
| AdminJwtStrategy| Validates admin token                  |
| AuthGuard       | Routes protection                      |
| RolesGuard      | Role-based control                     |
| CurrentUser     | Clean `req.user` decorator             |

---

## ✅ 12. Final Notes

- You can easily expand with Google login, refresh tokens, permissions, etc.
- All logic is modular, testable, and production-ready.

---
