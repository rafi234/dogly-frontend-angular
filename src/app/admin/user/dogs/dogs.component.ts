import {Component, OnInit} from '@angular/core';
import {Dog} from 'src/app/model/Dog';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent implements OnInit {

  dogs: Array<Dog> = new Array<Dog>()

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    console.log(this.dogs)
  }

  close() {
    this.activeModal.close()
  }
}
