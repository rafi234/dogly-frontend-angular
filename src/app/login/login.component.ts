import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {NgForm} from "@angular/forms";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message? : string
  whileLogging = false

  constructor(
    private authService: AuthService,
    private userService:UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(loginData: NgForm) {
    this.whileLogging = true
    this.userService.login(loginData).subscribe({
        next: (response:any) => {
          this.authService.setToken(response.token)
          this.authService.setRoles(response.user.roles)
          this.authService.setEmail(response.user.email)
          this.message = undefined
        },
        error: () => {
          this.message = 'Your email or password was not recognised - try again.'
          this.whileLogging = false
        },
        complete: () => {
          this.whileLogging = false
          this.router.navigate(['meetings'])
        }
      }
    )

  }
}
