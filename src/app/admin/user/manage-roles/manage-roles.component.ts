import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Role} from "../../../model/User";
import {UserService} from "../../../service/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit, OnDestroy {

  id = ''
  roles: Role[] = []
  user = 'ROLE_USER'
  admin = 'ROLE_ADMIN'

  subscription?: Subscription

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close()
  }

  isRolePresent(role: string) {
    return this.roles.filter(r => r === role).length > 0
  }

  manageRoles(action: string, role: string) {
      this.subscription = this.userService.manageRoles(this.id, action, role)
        .subscribe(
        {
          next: next => console.log(next),
          error: err => console.log(err),
          complete: () => this.close()
        }
      )
  }



  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
