import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";
import {UserComponent} from "../admin/user/user.component";
import {WalksService} from "../service/walks.service";
import {AdState, Walk} from "../model/Walk";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  walksNeedsAction: Walk[] = []
  states = [
    AdState.WAITING_FOR_USER,
    AdState.WAITING_FOR_CONFIRMATION,
    AdState.ALLOWED,
    AdState.DENIED
  ]

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private userComponent: UserComponent,
    private walkService: WalksService
  ) {
  }

  ngOnInit(): void {
    this.checkForMessages()
  }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }

  logout() {
    this.userService.logout().subscribe()
    this.authService.clear()
    this.router.navigate(['/meetings'])
    // TODO: add pop out window with message example "thx for using our app"
  }

  matchRole(roles: string[]): boolean {
    return this.userService.roleMatch(roles)
  }

  openEditUserComponent() {
    const email = this.authService.getEmail()
    if (email) {
      this.userService.getLoggedUser(email).subscribe({
        next: next => {
          this.userComponent.openModalEditUser(next)
          this.router.navigate(['user', 'edit'])
        },
        error: () => console.error("There is no user logged!")
      })
    }
  }

  checkForMessages() {
    this.walkService.getUsersWalkWithConfirmationNeeded().subscribe({
      next: (value: Walk[]) => {
        this.walksNeedsAction = value
        console.log(value)
      }
    })
  }
}
