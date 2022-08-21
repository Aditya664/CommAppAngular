import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-login-successful',
  templateUrl: './login-successful.component.html',
  styleUrls: ['./login-successful.component.scss']
})
export class LoginSuccessfulComponent implements OnInit {

  activeUser = this.util.getActiveUserId();
  activeUserFullName = this.activeUser[0]['fullname'];
  activeUserid = this.activeUser[0]['userid'];
  constructor
    (
      private route: Router,
      private util: UtilityService
    ) { }

  ngOnInit(): void {
    console.log(this.activeUser);
    if (this.activeUserid === null) {
      this.route.navigateByUrl('/welcome');
    } else {
      this.activeUserFullName = this.activeUser[0]['fullname'];
      console.log(this.activeUserFullName)
    }
  }

}
