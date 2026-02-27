import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ViewProfile } from './components/view-profile/view-profile';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserList },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'users/:id', component: ViewProfile },
];
