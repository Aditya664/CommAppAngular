import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editUserGroup!: FormGroup; // property form 
  user: any;
  users = this.util.getFromLocalStorage('users');

  constructor
    (
      private route: ActivatedRoute,
      private router: Router,
      private util: UtilityService,
      private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // getting id from url
    this.user = this.util.getUserById(id); // get product by id
    this.editUserGroup = this.fb.group({
      fullname: [this.user.fullname, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]]
    })
  }

  //Edit User
  editUserSave() {
    let fullname = this.editUserGroup.get('fullname')?.value;
    let email = this.editUserGroup.get('email')?.value;

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == this.user.id) {
        this.users[i].fullname = fullname;
        this.users[i].email = email;
        break;
      }
    }
    this.util.setToLocalStorage('users', this.users);
    alert('User Updated !')
    this.router.navigate(['/users']);
  }
}
