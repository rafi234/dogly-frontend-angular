import {Component, Injectable, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Dog} from 'src/app/model/Dog';
import {User} from "../../model/User";
import {UserService} from "../../service/user.service";
import {DogsComponent} from './dogs/dogs.component';
import {EditUserComponent} from './edit-user/edit-user.component';

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

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(next => this.users = next);
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

  rolesToString(roles: string[]): string {
    let str = ''
    for (let i = 0; i < roles.length; ++i) {
      str = str.concat(' ' + roles[i].substring(5))
    }
    return str
  }
}
