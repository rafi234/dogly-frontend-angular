import {Component, Input, OnInit} from '@angular/core';
import {Meeting} from "../../model/Meeting";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DogPark} from "../../model/DogPark";
import {MeetingsService} from "../../service/meetings.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {

  @Input()
  selected?: DogPark
  @Input()
  meeting: Meeting = new Meeting('', '', new Date(), new Date(), '')
  dogParks?: Array<DogPark>

  selectControl = new FormControl('', [Validators.required])

  constructor(
    private activeModal: NgbActiveModal,
    private meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
    this.meetingsService.getDogParks()
      .subscribe(next => this.dogParks =
        next.sort((a, b) => a.city.localeCompare(b.city))
      )
  }

  isDogParkLoaded(): boolean {
    if (this.dogParks) {
      if (this.dogParks.length !== 0) {
        return true
      }
    }
    return false
  }

  close() {
    this.activeModal.close()
  }

  confirm() {
    // add validation
    if (this.selected) {
      this.meeting.dogPark = this.selected
    }
    this.meetingsService.addMeeting(this.meeting).subscribe()
    this.activeModal.close(this.meeting)
  }

  validateDate(): boolean {
    return new Date(this.meeting.date) < new Date();
  }

  validateIfSentenceStartsProperly(str: string): boolean {
    const titleRegex = /^[A-Z0-9][^.!?]*/ // checks if title starts with an uppercase letter or a number
    return !titleRegex.test(str)
  }
}
