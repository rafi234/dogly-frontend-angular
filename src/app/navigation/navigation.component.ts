import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";
import {UserComponent} from "../admin/user/user.component";
import {WalksService} from "../service/walks.service";
import {AdState, Walk} from "../model/Walk";
import {HttpErrorResponse} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageComponent} from "../message/message.component";

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
    private walkService: WalksService,
    private modalService: NgbModal
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
    this.router.navigate(['meetings'], {queryParams: {page: 'meeting'}})
    const modalRef = this.modalService.open(MessageComponent)
    modalRef.componentInstance.title = "Thank you"
    modalRef.componentInstance.content = "Thank you for using our app. We hope you will come back soon. Have a nice day!"
    this.router.navigate(['walks'], {queryParams: {'action': 'thanks'}})
  }

  matchRole(roles: string[]): boolean {
    return this.userService.roleMatch(roles)
  }

  openEditUserComponent() {
    const email = this.authService.getEmail()
    if (email) {
      this.userService.getLoggedUser(email).subscribe({
        next: next => this.userComponent.openModalEditUser(next),
        error: () => console.error("There is no user logged!"),
        complete: () => this.router.navigate(['user', 'edit'])
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

  denyWalk(walk: Walk) {
    this.walkService.actionWalk(walk, 'forbidden').subscribe({
      error: (err: HttpErrorResponse) => console.error(err),
      complete: () => this.deleteWalk(walk)
    })
  }

  allowWalk(walk: Walk) {
    this.walkService.actionWalk(walk, 'confirmed').subscribe({
        error: (err: HttpErrorResponse) => console.error(err),
        complete: () => this.deleteWalk(walk)
      }
    )
  }

  closeMessage(walk: Walk, action: string) {
    this.walkService.actionWalk(walk, action).subscribe({
        error: (err: HttpErrorResponse) => console.error(err),
        complete: () => this.deleteWalk(walk)
      }
    )
  }

  deleteWalk(walk: Walk) {
    let index = -1
    this.walksNeedsAction.find((w: Walk, i: number) => {
      index = i
      return walk.id == w.id
    })
    this.walksNeedsAction.splice(index, 1)
  }
}
