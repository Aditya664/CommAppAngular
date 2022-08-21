import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginSuccessfulComponent } from './login-successful/login-successful.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSuccessfulComponent } from './register-successful/register-successful.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { DocsManagementComponent } from './docs-management/docs-management.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    LoginSuccessfulComponent,
    RegisterComponent,
    RegisterSuccessfulComponent,
    UsersManagementComponent,
    GroupChatComponent,
    DocsManagementComponent,
    LogoutComponent,
    EditUserComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
