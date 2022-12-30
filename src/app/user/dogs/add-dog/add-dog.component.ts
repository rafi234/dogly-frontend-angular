import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {Dog} from "../../../model/Dog";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {DogService} from "../../../service/dog.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageUtil} from "../../../utils/ImageUtil";

@Component({
  selector: 'app-add-dog',
  templateUrl: './add-dog.component.html',
  styleUrls: ['./add-dog.component.css']
})
export class AddDogComponent implements OnInit {

  @Input()
  dog: Dog = {
    id: '',
    name: '',
    dogsBirth: new Date(),
    breed: '',
    images: []
  }

  constructor(
    private sanitizer: DomSanitizer,
    private activeModal: NgbActiveModal,
    private dogService: DogService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close()
  }

  addDog(dogForm: NgForm) {
    if (this.dog) {
      const dogFromFormData = ImageUtil.prepareFormData(this.dog, 'dog', 'imageFile')

      this.dogService.addDog(dogFromFormData).subscribe(
        {
          next: () => dogForm.reset(),
          error: (err: HttpErrorResponse) => console.log(err)
        }
      )
      this.activeModal.close(this.dog)
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
