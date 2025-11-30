import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User;
  errorMessage: string = "";


  constructor( private location: Location,
               private userService: UserService,
               private router: Router) {
    this.user = new User();

  }



  ngOnInit() {


  }
onSubmit() {
  this.errorMessage = "";

  this.userService.signUp(this.user).subscribe({
    next: (u) => {
      this.router.navigate(['/login']);
    },
    error: (e) => {
      if (e.status === 409) {
        this.errorMessage = "This email is already registered.";
      } else {
        this.errorMessage = "This email is already registered.";
      }
    }
  });
}

}
