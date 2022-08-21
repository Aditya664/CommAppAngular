import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DocsManagementComponent } from './docs-management/docs-management.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { LoginSuccessfulComponent } from './login-successful/login-successful.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterSuccessfulComponent } from './register-successful/register-successful.component';
import { RegisterComponent } from './register/register.component';
import { UserGaurdGuard } from './users-management/user-gaurd.guard';
import { UsersManagementComponent } from './users-management/users-management.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'group-chat', canActivate: [AuthGuard], component: GroupChatComponent },
  { path: 'users', canActivate: [AuthGuard], component: UsersManagementComponent },
  { path: 'docmgt', canActivate: [AuthGuard], component: DocsManagementComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login-success', canActivate: [AuthGuard], component: LoginSuccessfulComponent },
  { path: 'register-success', component: RegisterSuccessfulComponent },
  { path: 'users/:id', canActivate: [UserGaurdGuard, AuthGuard], component: EditUserComponent },
  { path: 'user-delete', canActivate: [AuthGuard], component: UsersManagementComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
