import { Component, OnInit } from '@angular/core';
import {Dog} from "../../../model/Dog";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ImageUtil} from "../../../utils/ImageUtil";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpErrorResponse} from "@angular/common/http";
import {DogService} from "../../../service/dog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-dog',
  templateUrl: './edit-dog.component.html',
  styleUrls: ['./edit-dog.component.css']
})
export class EditDogComponent implements OnInit {

  dog: Dog = {
    id: '',
    name: '',
    breed: '',
    dogsBirth: new Date(),
    images: []
  }

  constructor(
    private activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer,
    private dogService: DogService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close()
  }

  onSubmit() {
    if (this.dog) {
      const dogFromFormData = ImageUtil.prepareFormData(this.dog, 'dog', 'imageFiles')

      this.dogService.editDog(dogFromFormData).subscribe(
        {
          error: (err: HttpErrorResponse) => console.log(err),
          complete: () => {
            this.activeModal.close()
            this.router.navigate(['user', 'dogs'])
          }
        }
      )
    }
  }

  onFileSelected($event: Event) {
    const fileHandle = ImageUtil.onFileSelected($event, this.sanitizer)
    this.dog.images.push(fileHandle)
  }

  removeImage(i: number) {
    this.dog.images.splice(i, 1)
  }
}
