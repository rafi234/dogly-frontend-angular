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

@Component({
  selector: 'app-walks',
  templateUrl: './walks.component.html',
  styleUrls: ['./walks.component.css']
})
export class WalksComponent implements OnInit {

  walks: Array<Walk> = new Array<Walk>()


  constructor(
    private modalService: NgbModal,
    private walkService: WalksService,
    private imageProcessingService: ImageProcessingService,
    public config: NgbCarouselConfig
  ) {
    config.interval = 0
  }

  ngOnInit(): void {
    this.walkService.getWalks()
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
}
