import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WalksAddComponent} from "./walks-add/walks-add.component";

@Component({
  selector: 'app-walks',
  templateUrl: './walks.component.html',
  styleUrls: ['./walks.component.css']
})
export class WalksComponent implements OnInit {

  loop = [0, 0, 0 , 0, 0, 0, 0, 0, 0]


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openAddWalksComponent() {
    this.modalService.open(WalksAddComponent)
  }

}
