import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {Address, Role, User} from "../model/User";
import {Dog} from "../model/Dog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  @Input()
  user : User
  @Input()
  password : string = ''
  @Input()
  repeatedPassword : string = ''

  passwordContainUpperCase = false
  passwordContainLowerCase = false
  passwordContainNumber = false
  passwordHasProperLength = false

  constructor(private userService : UserService, private router: Router) {
    this.user = new User('', '', '', '',
    new Address('', '', '', '', '', ''),
    new Array<Dog>(), new Array<Role>(), false)
  }

  ngOnInit(): void {
    this.passwordValidation()
  }

  isRepeatedPasswordValid() {
    return this.password !== this.repeatedPassword;
  }

  passwordValidation() {
    let upperCaseCharacters = /[A-Z]+/g
    let lowerCaseCharacters = /[a-z]+/g
    let numberCaseCharacters = /[0-9]+/g
    this.passwordContainUpperCase = upperCaseCharacters.test(this.password)
    this.passwordContainLowerCase = lowerCaseCharacters.test(this.password)
    this.passwordContainNumber = numberCaseCharacters.test(this.password)
    this.passwordHasProperLength = this.password.length > 8

    return !(this.passwordContainNumber && this.passwordContainLowerCase &&
      this.passwordHasProperLength && this.passwordContainUpperCase)
  }

  signUp() {
    this.userService.addUser(this.user, this.password).subscribe()
    this.router.navigate(['/'])
  }
}
