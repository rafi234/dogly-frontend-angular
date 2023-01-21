import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddMeetingComponent} from "./add-meeting/add-meeting.component";
import {Meeting} from "../model/Meeting";
import {MeetingsService} from "../service/meetings.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  private routeSubscription?: Subscription
  private deleteMeetingSubscription?: Subscription
  private editSubscription?: Subscription


  queryParam = ''

  meetings: Array<Meeting> = new Array<Meeting>()


  constructor(
    private modalService: NgbModal,
    private meetingService: MeetingsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.refreshButtons()
  }

  refreshButtons() {
    this.routeSubscription = this.route.queryParams.subscribe(param => this.queryParam = param['page'])
    if (this.queryParam)
      this.meetingsSubscription = this.meetingService.getMeetings(this.queryParam).subscribe(next => this.meetings = next)
  }


  openAddMeeting(queryParam: string, meeting?: Meeting) {
    const modalRef = this.modalService.open(AddMeetingComponent)
    if (meeting) {
      modalRef.componentInstance.meeting = meeting
      modalRef.componentInstance.selected = meeting.dogPark
    }
    this.router.navigate(['meetings'], { queryParams:  { action: queryParam, page: 'meeting' } })
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

  deleteMeeting(id: string) {
    if (confirm("Are you sure you want to delete this meeting?")) {
      this.deleteMeetingSubscription = this.meetingService.deleteMeeting(id)
        .subscribe({
          complete: () => this.refreshButtons()
        })
    }
  }

  ngOnDestroy(): void {
    this.goingSubscription?.unsubscribe()
    this.interestedSubscription?.unsubscribe()
    this.meetingsSubscription?.unsubscribe()
    this.routeSubscription?.unsubscribe()
    this.deleteMeetingSubscription?.unsubscribe()
    this.editSubscription?.unsubscribe()
  }
}
