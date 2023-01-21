import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from 'src/app/model/User';
import {UserService} from "../../../service/user.service";
import {ImageUtil} from "../../../utils/ImageUtil";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user?: User

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
  }

  passBack(action: string) {
    if (!this.user)
      throw Error()
    if (action === 'UPDATE') {
      this.userService.updateUser(this.user).subscribe({
        next: () =>this.close()
      })
    }
    else if (action === 'DELETE') {
      if (confirm('Are you sure you want to delete user with email: ' + this.user.email)) {
        this.userService.deleteUser(this.user).subscribe({
          next: () =>this.close()
        })
      }
    }
  }

  onFileSelected($event: Event) {
    const fileHandle = ImageUtil.onFileSelected($event, this.sanitizer)
    this.user?.images.push(fileHandle)
  }

  removeImage(i: number) {
    this.user?.images.splice(i, 1)
  }

  close() {
    this.activeModal.close()
  }

}
