import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Meeting} from "../../model/Meeting";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DogPark} from "../../model/DogPark";
import {MeetingsService} from "../../service/meetings.service";
import {FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit, OnDestroy {

  @Input()
  selected?: DogPark
  @Input()
  meeting: Meeting = new Meeting('', '', new Date(), new Date(), '')
  dogParks?: Array<DogPark>

  reqParam = ''

  selectControl = new FormControl('', [Validators.required])

  private dogParksSub?: Subscription;
  private paramSub?: Subscription
  private meetingSub?: Subscription

  constructor(
    private activeModal: NgbActiveModal,
    private meetingsService: MeetingsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paramSub = this.route.queryParams.subscribe(param => this.reqParam = param['action'])
    console.log(this.reqParam)
    this.dogParksSub = this.meetingsService.getDogParks()
      .subscribe({
          next: next => this.dogParks = next.sort((a, b) => a.city.localeCompare(b.city)),
          complete: () => {
            const dp = this.dogParks?.find(d => d.id === this.meeting.dogPark?.id)
          }
        }
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
    if (this.selected) {
      this.meeting.dogPark = this.selected
    }
    if (this.reqParam === 'add')
      this.meetingSub = this.meetingsService.addMeeting(this.meeting).subscribe()
    else if (this.reqParam === 'edit')
      this.meetingSub = this.meetingsService.edit(this.meeting).subscribe()
    this.activeModal.close(this.meeting)
    this.router.navigate(['user', 'meetings'], { queryParams: { page: 'meeting' }})
  }

  validateDate(): boolean {
    return new Date(this.meeting.date) < new Date();
  }

  validateIfSentenceStartsProperly(str: string): boolean {
    const titleRegex = /^[A-Z0-9][^.!?]*/ // checks if title starts with an uppercase letter or a number
    return !titleRegex.test(str)
  }

  ngOnDestroy(): void {
    this.dogParksSub?.unsubscribe()
    this.meetingSub?.unsubscribe()
    this.paramSub?.unsubscribe()
  }
}
