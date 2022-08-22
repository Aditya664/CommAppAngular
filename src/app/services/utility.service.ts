import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private route: Router) { }


  //check user exists or not
  userExists(email: string): any {
    let users: any[] = this.getFromLocalStorage('users');
    let exists: boolean = false;
    if ('users' in localStorage) {
      console.log('exists')
      exists = true;
    }

    if (exists) {
      //Check user already exists or not
      for (let i = 0; i < users.length ; i++) {
        if (users[i].email == email) {
          return 1;
        }
      }
    }
  }
   //check docs exists
   docExists(filename: string): any {
    let uploads: any[] = this.getFromLocalStorage('upload');
    let exists: boolean = false;
    if ('upload' in localStorage) {
      console.log('exists')
      exists = true;
    }

    if (exists) {
      //Check docs already exists or not
      for (let i = 0; i < uploads.length ; i++) {
        if (uploads[i].filename == filename) {
          return 1;
        }
      }
    }
  }

  //Getting data from localstorage
  getFromLocalStorage(key: string): any {
    let records = localStorage.getItem(key);
    if (records != null) {
      return JSON.parse(records);
    }
  }

  //check loggedinuser is exists or not 
  ifLogedIn() {
    let isLogedIn = this.getFromLocalStorage('LOGGED_IN_USER');
    if (isLogedIn != null) {
      this.route.navigateByUrl('login-success'); //if exists then go to login-success component
    } else {
      this.route.navigateByUrl('welcome'); //or go to welcome component
    }
  }

  //setting data to localstorage
  setToLocalStorage(key: string, value: any): any {
    localStorage.setItem(key, JSON.stringify(value));
  }

  //getting userinformation by id
  getUserById(id: number) {
    let user = this.getFromLocalStorage('users');
    for (let i = 0; i < user.length; i++) {
      if (user[i].id == id) {
        return user[i];
      }
    }
  }

  //logout user
  logoutUser() {
    localStorage.removeItem('LOGGED_IN_USER');
  }

  gettoken() {
    return !!localStorage.getItem("LOGGED_IN_USER");
  }

  //check password and confirmPassword 
  passwordMatcher(pass1: string, pass2: string) {
    if (pass1 != pass2) {
      return false; //if not same then
    }
    return true; //if same
  }

  //getiing logged in user information 
  getActiveUserId(): any[] {
    let idFromLocalStorage = this.getFromLocalStorage('LOGGED_IN_USER');
    if (idFromLocalStorage == undefined || idFromLocalStorage == null) {
      return [];
    } else {
      return [idFromLocalStorage];
    }
  }

  //getting document info by id
  getDocumentById(id: number) {
    let upload = this.getFromLocalStorage('upload');
    for (let i = 0; i < upload.length; i++) {
      if (upload[i].id == id) {
        return upload[i];
      }
    }
  }
}
