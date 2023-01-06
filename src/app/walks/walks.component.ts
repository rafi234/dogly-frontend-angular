import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WalksAddComponent} from "./walks-add/walks-add.component";
import {Walk} from "../model/Walk";
import {WalksService} from "../service/walks.service";
import {FileHandle} from "../model/file-handle";
import {Dog} from "../model/Dog";
import {HttpErrorResponse} from "@angular/common/http";
import {map} from "rxjs";
import {ImageProcessingService} from "../service/image-processing.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-walks',
  templateUrl: './walks.component.html',
  styleUrls: ['./walks.component.css']
})
export class WalksComponent implements OnInit {

  walks: Array<Walk> = new Array<Walk>()
  pageParam = ''

  constructor(
    private modalService: NgbModal,
    private walkService: WalksService,
    private imageProcessingService: ImageProcessingService,
    private route: ActivatedRoute,
    public config: NgbCarouselConfig
  ) {
    config.interval = 0
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.route.queryParams.subscribe({
        next: param => this.pageParam = param['page']
      }
    )
    this.walkService.getWalks(this.pageParam)
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
    this.modalService.open(WalksAddComponent)
  }

  connectedImagesToOneArray(dogs: Dog[]): FileHandle[] {
    return dogs.flatMap(dog => dog.images)
  }

  getName(dog: Dog) {
    return ' ' + dog.name
  }

  confirmWalk(walk: Walk, index: number) {
    if (confirm(`Once you confirm, you are obligated to go for a walk with this dog/dogs,
     unless user ${walk.user?.name} ${walk.user?.surname} won't confirm that.`)) {
      this.walkService.actionWalk(walk, 'confirm').subscribe({
          error: (err: HttpErrorResponse) => {
            alert(`${err}: make sure you not confirmed the walk which you created, also check if you are logged in.`)
          },
          complete: () => this.walks.splice(index, 1)
        }
      )
    }
  }

}
