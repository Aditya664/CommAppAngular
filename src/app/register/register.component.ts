import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../interface/iuser';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  RegisterForm !: FormGroup;
  userObject!: IUser;

  constructor(
    private fb: FormBuilder,
    private util: UtilityService,
    private route: Router
  ) { }

  ngOnInit(): void {
    //this.util.addDummyUser();
    this.RegisterForm = this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  /*Add User Function*/
  addUser(): void {
    let oldRecord = this.util.getFromLocalStorage('users');
    let isExist: boolean = false;
    let users: IUser[] = [];

    //User object
    this.userObject = {
      id: Number(new Date()),
      'fullname': this.RegisterForm.value.fullname,
      'email': this.RegisterForm.value.email,
      'password': this.RegisterForm.value.confirmPassword
    };

    if (this.util.userExists(this.RegisterForm.value.email) === 1) {
      alert('user exists !');
    } else if (!this.util.passwordMatcher(this.RegisterForm.value.password, this.RegisterForm.value.confirmPassword)) {
      alert('password missmatch !');
    } else {
      let usersList = [];
      usersList = (oldRecord!);
      users = usersList ? usersList : []; // ternary operator
      users.push(this.userObject);
      this.util.setToLocalStorage('users', users);
      this.route.navigateByUrl('register-success');
    }
  }
}

