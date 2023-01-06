import {Component, Injectable, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Dog} from 'src/app/model/Dog';
import {User} from "../../model/User";
import {UserService} from "../../service/user.service";
import {DogsComponent} from './dogs/dogs.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {ManageRolesComponent} from "./manage-roles/manage-roles.component";
import {MessageComponent} from "../../message/message.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
@Injectable({
    providedIn: 'root'
  }
)
export class UserComponent implements OnInit {

  users: Array<User> = new Array<User>()
  searchText = ''
  @Input()
  newPassword?: string
  clicked: boolean[] = [];

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.refreshUsers()
  }

  refreshUsers() {
    this.userService.getUsers().subscribe(next => {
        this.users = next
        this.clicked = new Array<boolean>(this.users.length)
        console.log(this.clicked)
      }
    );
  }

  openModalManageRoles(id: string, roles: []) {
    const modalRef = this.modalService.open(ManageRolesComponent)
    modalRef.componentInstance.roles = roles
    modalRef.componentInstance.id = id
    modalRef.result.then(() => this.refreshUsers())
  }

  openModalDogs(dogs: Array<Dog>) {
    const modalRef = this.modalService.open(DogsComponent)
    modalRef.componentInstance.dogs = dogs
  }

  openModalEditUser(user: User) {
    console.log(this.users)
    const modalRef = this.modalService.open(EditUserComponent)
    modalRef.componentInstance.user = user
    modalRef.result.then(result => {
        if (result) {
          const action = result[1]
          if (action === 'UPDATE')
            this.userService.updateUser(result[0]).subscribe()
          else if (action === 'DELETE') {
            if (confirm('Are you sure you want to delete user with email: ' + user.email)) {
              this.userService.deleteUser(result[0]).subscribe()
            }
          }
        }
      }
    )
  }

  openChangedPasswordSuccessfullyModal() {
    const modalRef = this.modalService.open(MessageComponent)
    modalRef.componentInstance.title = 'Success'
    modalRef.componentInstance.content = 'You changed password successfully.'
  }


  rolesToString(roles: string[]): string {
    let str = ''
    for (let i = 0; i < roles.length; ++i) {
      str = str.concat(roles[i].substring(5) + ', ')
    }
    return str.substring(0, str.length - 2)
  }

  changePassword(id: string, index: number) {
    if (this.newPassword)
      this.userService.changePassword(this.newPassword, id).subscribe({
        complete: () => this.openChangedPasswordSuccessfullyModal()
        }
      )
    this.onNewPasswordButtonClicked(index)
  }

  onNewPasswordButtonClicked(index: number) {
    this.clicked[index] = !this.clicked[index]
  }
}
