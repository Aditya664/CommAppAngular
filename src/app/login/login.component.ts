import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup; // property form 
  userID!: number;
  activeUser: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilityService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  //Check email and password is available or not in localstorage
  authUser() {
    let users = this.util.getFromLocalStorage('users');
    let email = this.LoginForm.get('email')?.value;
    let password = this.LoginForm.get('password')?.value;

    for (let i = 0; i < users.length; i++) {
      if (users[i].email == email && users[i].password == password) {
        this.userID = users[i].id;
        //Logged in user object
        this.activeUser = {
          fullname: users[i].fullname,
          userid: this.userID
        }
        this.util.setToLocalStorage('LOGGED_IN_USER', this.activeUser);
        this.route.navigate(['/login-success']);
        return;
      }
    }
    alert('Please enter correct email and password');
  }
}
