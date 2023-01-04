import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AdState, Walk} from "../../model/Walk";
import {NgForm} from "@angular/forms";
import {WalksService} from "../../service/walks.service";
import {Dog} from "../../model/Dog";
import {DogService} from "../../service/dog.service";
import {CheckedDog} from "../../model/CheckedDog";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-walks-add',
  templateUrl: './walks-add.component.html',
  styleUrls: ['./walks-add.component.css']
})
export class WalksAddComponent implements OnInit {

  walk: Walk = {
    id: '',
    description: '',
    price: 0,
    dogs: [],
    date: new Date(),
    addedAt: new Date(),
    adState: AdState.WAITING_FOR_USER,
    confirmedAt: new Date()
  }

  checkedDogs: CheckedDog[] = []

  constructor(
    private activeModal: NgbActiveModal,
    private dogService: DogService,
    private walkService: WalksService
  ) {
  }

  ngOnInit(): void {
    this.loadDogs()
  }

  loadDogs() {
    this.dogService.getUsersDogs().subscribe({
        next: value => this.checkedDogs = value.map((dog: Dog) => {
            return {
              dog: dog,
              checked: false
            }
          }
        )
      }
    )
  }

  closeModal() {
    console.log(this.walk.price)
    this.activeModal.close()
  }

  addWalk(walkForm: NgForm) {
    walkForm.value.dogIds = this.checkedDogs.filter(d => d.checked).map(d => d.dog.id)
    this.walkService.addWalk(walkForm).subscribe(
      {
        next: () => walkForm.reset(),
        error: (err: HttpErrorResponse) => console.log(err)
      }
    )
    this.closeModal()
  }
}
