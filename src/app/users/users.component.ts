import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
  

export class UsersComponent implements OnInit {

  users: User[];

  userFormControl = new FormControl('', [
    Validators.required
  ]);
  
  //  selectedUser: User;
  //
  //  onSelect(user: User): void {
  //    this.selectedUser = user;
  //  }

  constructor(private userService: UserService) {}

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  ngOnInit() {
    this.getUsers();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {return;}
    this.userService.addUser({name} as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }
}