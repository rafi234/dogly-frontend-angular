import {Component, OnDestroy, OnInit} from '@angular/core';
import {DogService} from "../../service/dog.service";
import {Dog} from "../../model/Dog";
import {NgbCarouselConfig, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {AddDogComponent} from "./add-dog/add-dog.component";
import {map, Subscription} from "rxjs";
import {ImageProcessingService} from "../../service/image-processing.service";
import {EditDogComponent} from "./edit-dog/edit-dog.component";

@Component({
  selector: 'app-dogs',
  templateUrl: './user-dogs.component.html',
  styleUrls: ['./user-dogs.component.css']
})
export class UserDogsComponent implements OnInit, OnDestroy {

  dogs: Array<Dog> = new Array<Dog>()
  searchText = ''

  dogsSubscription?: Subscription


  constructor(private dogService: DogService,
              private modalService: NgbModal,
              private router: Router,
              private imageProcessingService: ImageProcessingService,
              public config: NgbCarouselConfig
  ) {
    config.interval = 0
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    const path = this.getPath()
    if (path === '/user/dogs') {
      this.dogsSubscription = this.dogService.getUsersDogs()
        .pipe(
          map((x: Dog[]) => x.map((dog: Dog) => {
              dog.images = this.imageProcessingService.createImages(dog.images)
              return dog
            }
          ))
        )
        .subscribe(next => {
          return this.dogs = next;
        })
    }
    if (path === '/admin/dogs') {
      this.dogsSubscription = this.dogService.getAllDogs()
        .pipe(
          map((x: Dog[]) => x.map((dog: Dog) => {
              dog.images = this.imageProcessingService.createImages(dog.images)
              return dog
            }
          ))
        )
        .subscribe(next => {
          return this.dogs = next;
        })
    }
  }

  getPath(): string {
    return this.router.url
  }

  openAddDogComponent() {
    const modalRef = this.modalService.open(AddDogComponent)
    this.navigate('add')
    modalRef.result.then(
      (dog: Dog) => {
        if (dog)
          this.dogs.push(dog)
      }
    )
  }

  openEditDogComponent(dog: Dog) {
    const modalRef = this.modalService.open(EditDogComponent)
    modalRef.componentInstance.dog = dog
    this.navigate('edit')
  }

  deleteDog(id: string, i: number) {
    if (confirm("Are you sure you want delete thie dog?")) {
      this.dogService.deleteDog(id).subscribe({
        error: () => console.error("Error with deleting dog!")
      })
      this.dogs.splice(i, 1)
    }
  }

  ngOnDestroy() {
    this.dogsSubscription?.unsubscribe()
  }

  private navigate(action: string) {
    this.router.navigate(['user', 'dogs'], {queryParams: {'action': action}})
  }
}
