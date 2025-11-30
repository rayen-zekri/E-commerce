import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {
users: User[] = [];

  constructor(private adminUserService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminUserService.getAllUsers().subscribe({
      next: data => this.users = data,
      error: err => console.error(err)
    });
  }

 activate(user: User) {
  this.adminUserService.activateUser(user.id).subscribe({
    next: updatedUser => {
      Object.assign(user, updatedUser); // met à jour toutes les propriétés de user
    },
    error: err => console.error(err)
  });
}


  deactivate(user: User) {
    this.adminUserService.deactivateUser(user.id).subscribe({
      next: updatedUser => {
      Object.assign(user, updatedUser); // met à jour toutes les propriétés de user
    },
    error: err => console.error(err)
  });
}


}
