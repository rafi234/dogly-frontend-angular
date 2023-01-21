import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AdState, Walk} from "../../model/Walk";
import {NgForm} from "@angular/forms";
import {WalksService} from "../../service/walks.service";
import {Dog} from "../../model/Dog";
import {DogService} from "../../service/dog.service";
import {CheckedDog} from "../../model/CheckedDog";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-walks-add',
  templateUrl: './walks-add.component.html',
  styleUrls: ['./walks-add.component.css']
})
export class WalksAddComponent implements OnInit, OnDestroy {

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

  pageParam = ''

  dogsSub?: Subscription

  checkedDogs: CheckedDog[] = []

  constructor(
    private activeModal: NgbActiveModal,
    private dogService: DogService,
    private walkService: WalksService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadDogs()
  }

  loadDogs() {
    this.route.queryParams.subscribe(param => this.pageParam = param['page'])
    if (this.pageParam === 'walk') {
      this.dogsSub = this.dogService.getUsersDogs().subscribe({
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
  }

  closeModal() {
    this.activeModal.close()
  }

  addWalk(walkForm: NgForm) {
    if (this.pageParam === 'walk') {
      walkForm.value.dogIds = this.checkedDogs.filter(d => d.checked).map(d => d.dog.id)
      this.walkService.addWalk(walkForm).subscribe(
        {
          error: (err: HttpErrorResponse) => console.log(err),
          complete: () => {
            this.activeModal.close(this.walk)
          }
        }
      )
    }
    if (this.pageParam === 'admin') {
      this.walkService.updateWalk(this.walk).subscribe({
        complete: () => this.closeModal()
        }
      )
    }
  }

  ngOnDestroy() {
    this.dogsSub?.unsubscribe()
  }
}
