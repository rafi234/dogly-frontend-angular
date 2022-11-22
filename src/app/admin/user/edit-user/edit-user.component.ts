import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Address, User } from 'src/app/model/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user? : User

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  passBack(action : string) {
    const retVal = [this.user, action]
    this.activeModal.close(retVal)
  }

  close() {
    this.activeModal.close()
  }

}
