import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbCarouselConfig, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WalksAddComponent} from "./walks-add/walks-add.component";
import {Walk} from "../model/Walk";
import {WalksService} from "../service/walks.service";
import {FileHandle} from "../model/file-handle";
import {Dog} from "../model/Dog";
import {HttpErrorResponse} from "@angular/common/http";
import {map, Subscription} from "rxjs";
import {ImageProcessingService} from "../service/image-processing.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../service/user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-walks',
  templateUrl: './walks.component.html',
  styleUrls: ['./walks.component.css']
})
export class WalksComponent implements OnInit, OnDestroy {

  walks: Array<Walk> = new Array<Walk>()
  searchText = ''
  pageParam = ''

  actionSub?: Subscription
  walksSub?: Subscription
  paramsSub?: Subscription
  deleteSub?: Subscription

  constructor(
    private modalService: NgbModal,
    private walkService: WalksService,
    private imageProcessingService: ImageProcessingService,
    private route: ActivatedRoute,
    private userService: UserService,
    public config: NgbCarouselConfig
  ) {
    config.interval = 0
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.paramsSub = this.route.queryParams.subscribe({
        next: param => this.pageParam = param['page']
      }
    )
    this.walksSub = this.walkService.getWalks(this.pageParam)
      .pipe(
        map((x: Walk[]) => x.map((walk: Walk) => {
            walk.dogs.map(
              dog => dog.images = this.imageProcessingService.createImages(dog.images)
            )
            return walk
          }
        ))
      )
      .subscribe({
          next: value => this.walks = value,
          error: (err: HttpErrorResponse) => console.error(err)
        }
      )
  }

  openAddWalksComponent() {
    const modalRef = this.modalService.open(WalksAddComponent)
    modalRef.result.then((walk: Walk) => this.walks.push(walk))
  }

  connectedImagesToOneArray(dogs: Dog[]): FileHandle[] {
    return dogs.flatMap(dog => dog.images)
  }

  getName(dog: Dog) {
    return ' ' + dog.name
  }

  matchRole(roles: string[]): boolean {
    return this.userService.roleMatch(roles)
  }

  confirmWalk(walk: Walk, index: number) {
    if (confirm(`Once you confirm, you are obligated to go for a walk with this dog/dogs,
     unless user ${walk.user?.name} ${walk.user?.surname} won't confirm that.`)) {
      this.actionSub = this.walkService.actionWalk(walk, 'confirm').subscribe({
          error: (err: HttpErrorResponse) => {
            alert(`${err}: make sure you not confirmed the walk which you created, also check if you are logged in.`)
          },
          complete: () => this.walks.splice(index, 1)
        }
      )
    }
  }

  deleteWalk(walk: Walk, index: number) {
    if (confirm('Are you sure you want to delete this walk?')) {
      this.deleteSub = this.walkService.deleteWalk(walk).subscribe({
          complete: () => this.walks.splice(index, 1)
        }
      );
    }
  }

  editWalk(walk: NgForm) {
    const modalRef = this.modalService.open(WalksAddComponent)
    modalRef.componentInstance.walk = walk
  }

  ngOnDestroy() {
    this.walksSub?.unsubscribe()
    this.actionSub?.unsubscribe()
    this.paramsSub?.unsubscribe()
    this.deleteSub?.unsubscribe()
  }


}
