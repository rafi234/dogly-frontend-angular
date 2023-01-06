import {User} from "./User";
import {DogPark} from "./DogPark";

export class Meeting {
  id: string
  description: string
  addedAt: Date
  date: Date
  title: string
  goingClicked?: User[]
  interestedClicked?: User[]
  user?: User
  dogPark?: DogPark

  constructor(
    id: string,
    description: string,
    addedAt: Date,
    date: Date,
    title: string,
    goingClicked?: User[],
    interestedClicked?: User[],
    dogPark?: DogPark,
    user?: User
  ) {
    this.id = id
    this.description = description
    this.addedAt = addedAt
    this.date = date
    this.user = user
    this.title = title
    this.dogPark = dogPark
    this.goingClicked = goingClicked
    this.interestedClicked = interestedClicked
  }

  static fromHttp(meeting: Meeting, date: any, addedAt: any): Meeting {
    let user
    if (meeting.user)
       user = User.fromHttp(meeting.user);
    let dogPark
    if (meeting.dogPark)
      dogPark = DogPark.fromHttp(meeting.dogPark)
    return new Meeting(
      meeting.id,
      meeting.description,
      addedAt,
      date,
      meeting.title,
      this.userArrayFromHttp(meeting.goingClicked),
      this.userArrayFromHttp(meeting.interestedClicked),
      dogPark,
      user
    )
  }

  private static userArrayFromHttp(users?: User[]): User[] {
    if (users)
      return users.map(user => User.fromHttp(user))
    return []
  }

  isMeetingValid() {
    return this.dogPark != undefined &&
      this.description !== '' &&
      this.title !== ''
  }
}
