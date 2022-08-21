import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IChat } from '../interface/ichat';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})

export class GroupChatComponent implements OnInit {

  message!: IChat;
  activeUserName!: string;
  activeUserID!: number;
  Messages: IChat[] = [];
  date!: any;
  chatGroup!: FormGroup;
  constructor
    (
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private util: UtilityService
    ) { }

  ngOnInit(): void {
    this.date = new Date();
    this.activeUserName = this.util.getActiveUserId()[0]['fullname'];
    this.activeUserID = this.util.getActiveUserId()[0]['userid'];
    this.Messages = this.util.getFromLocalStorage('chats');
    this.chatGroup = this.fb.group({
      message: ['', [Validators.required]],
    });
  }

  //Add Chat
  addChat(): void {
    this.message = {
      'date': this.date,
      'fullname': this.activeUserName,
      'message': this.chatGroup.value.message,
      'userid': this.activeUserID
    }

    let oldRecord = localStorage.getItem('chats');
    if (oldRecord != null) {
      let userList = JSON.parse(oldRecord);
      userList.push(this.message);
      localStorage.setItem('chats', JSON.stringify(userList));
    } else {
      const userArr = [];
      userArr.push(this.message);
      localStorage.setItem('chats', JSON.stringify(userArr));
    }
  }
}
