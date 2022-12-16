import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-walks-add',
  templateUrl: './walks-add.component.html',
  styleUrls: ['./walks-add.component.css']
})
export class WalksAddComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close()
  }

}
