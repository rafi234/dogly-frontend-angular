import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Dog} from 'src/app/model/Dog';
import {Address, User} from "../../model/User";
import {UserService} from "../../service/user.service";
import {DogsComponent} from './dogs/dogs.component';
import {EditUserComponent} from './edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Array<User> = new Array<User>()

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
    })
  }
}
