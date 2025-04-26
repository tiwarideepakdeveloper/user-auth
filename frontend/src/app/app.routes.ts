import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/auth/sign-in', 
        pathMatch: 'full',
    },
    { 
        path: 'auth', 
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
        canActivate: [authGuard]
    },
    { 
        path: 'admin', 
        loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
        canActivate: [authGuard]
    }
];
