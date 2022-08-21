import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IChat } from '../interface/ichat';
import { IUser } from '../interface/iuser';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})

export class UsersManagementComponent implements OnInit {

  Users: IUser[] = [];
  Chats: IChat[] = [];
  formModal: any;
  DELETE_USER_BY_ID!: number;
  activeUser = this.utility.getActiveUserId();
  activeUserid = this.activeUser[0]['userid'];
  constructor(private utility: UtilityService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.Users = this.utility.getFromLocalStorage('users');
    this.Chats = this.utility.getFromLocalStorage('chats');
    console.log(this.Users);
  }

  //get userid 
  deleteUser(id: number) {
    this.DELETE_USER_BY_ID = id;
  }

  //delete user and delete messages
  userOkDelete() {
    this.Users = this.Users.filter(user => user.id !== this.DELETE_USER_BY_ID);
    this.utility.setToLocalStorage('users', this.Users);

    this.Chats = this.Chats.filter(chat => chat.userid !== this.DELETE_USER_BY_ID);
    this.utility.setToLocalStorage('chats', this.Chats);
    this.ngOnInit();
  }
}
