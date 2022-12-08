import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  massage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authService.authenticate(this.email, this.password)) {
      console.log(`${this.email} ${this.password}`)
    } else {
      this.massage = 'Your email or password was not recognised - try again.'
    }
  }

}
