import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddMeetingComponent} from "./add-meeting/add-meeting.component";
import {Meeting} from "../model/Meeting";
import {MeetingsService} from "../service/meetings.service";

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

  meetings: Array<Meeting> = new Array<Meeting>()

  constructor(
    private modalService: NgbModal,
    private meetingService: MeetingsService
  ) { }

  ngOnInit(): void {
    this.meetingService.getMeetings().subscribe(next => this.meetings = next)
  }

  openAddMeeting() {
    const modalRef = this.modalService.open(AddMeetingComponent)
  }

  onGoingClick(id: string) {
    const meeting = this.meetings.find(m => m.id === id)
    if (meeting)
      meeting.going += 1
    this.meetingService.action(id, 'going').subscribe()
  }

  onInterestedClick(id: string) {
    const meeting = this.meetings.find(m => m.id === id)
    if (meeting)
      meeting.interested += 1
    this.meetingService.action(id, 'interested').subscribe()
  }
}
