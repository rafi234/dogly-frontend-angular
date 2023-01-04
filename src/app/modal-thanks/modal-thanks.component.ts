import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-thanks',
  templateUrl: './modal-thanks.component.html',
  styleUrls: ['./modal-thanks.component.css']
})
export class ModalThanksComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close()
  }
}
