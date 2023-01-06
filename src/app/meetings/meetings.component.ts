import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddMeetingComponent} from "./add-meeting/add-meeting.component";
import {Meeting} from "../model/Meeting";
import {MeetingsService} from "../service/meetings.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit, OnDestroy {

  private goingSubscription?: Subscription
  private interestedSubscription?: Subscription
  private meetingsSubscription?: Subscription


  meetings: Array<Meeting> = new Array<Meeting>()

  constructor(
    private modalService: NgbModal,
    private meetingService: MeetingsService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.refreshButtons()
  }

  refreshButtons() {
    this.meetingsSubscription = this.meetingService.getMeetings().subscribe(next => this.meetings = next)
  }

  openAddMeeting() {
    const modalRef = this.modalService.open(AddMeetingComponent)
    this.router.navigate(['meetings'], {queryParams: {'action': 'add'}})
    modalRef.result.then(result => {
        if (!result) {
          return
        }
        if (result.isMeetingValid())
          this.meetings.push(result)
      }
    )
  }

  onClick(id: string, action: string) {
    this.goingSubscription = this.meetingService.action(id, action).subscribe({
        complete: () => this.refreshButtons()
      }
    )
  }

  matchRole(roles: string[]): boolean {
    return this.userService.roleMatch(roles)
  }

  ngOnDestroy(): void {
    this.goingSubscription?.unsubscribe()
    this.interestedSubscription?.unsubscribe()
    this.meetingsSubscription?.unsubscribe()
  }
}
