import {Component, Input, OnInit} from '@angular/core';
import {Meeting} from "../../model/Meeting";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DogPark} from "../../model/DogPark";
import {MeetingsService} from "../../service/meetings.service";

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {

  @Input()
  selected?: String
  @Input()
  meeting: Meeting = new Meeting('', '', new Date(), new Date(), 0, 0, '', undefined, undefined)
  dogParks?: Array<DogPark>

  constructor(
    private activeModal: NgbActiveModal,
    private meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
    console.log(this.meeting);
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
    if(this.dogParks) {
      this.meeting.dogPark = this.dogParks.find(dp => dp.id === this.selected)
    }
    // TODO: needs user who create it
    // this.meetingsService.addMeeting(this.meeting)
    this.close()
  }
}
