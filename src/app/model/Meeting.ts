import {User} from "./User";
import {DogPark} from "./DogPark";

export class Meeting {
  id: string
  description: string
  addedAt: Date
  date: Date
  interested: number
  going: number
  title: string
  user?: User
  dogPark?: DogPark

  constructor(
    id: string,
    description: string,
    addedAt: Date,
    date: Date,
    interested: number,
    going: number,
    title: string,
    dogPark?: DogPark,
    user?: User
  ) {
    this.id = id;
    this.description = description;
    this.addedAt = addedAt;
    this.date = date
    this.user = user;
    this.interested = interested;
    this.going = going;
    this.title = title
    this.dogPark = dogPark
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
      this.getDateFromHttp(addedAt),
      this.getDateFromHttp(date),
      meeting.interested,
      meeting.going,
      meeting.title,
      dogPark,
      user
    )
  }

  static getDateFromHttp(date: Array<number>): Date {
    return new Date(date[0], date[1], date[2], date[3], date[4], date[5])
  }
}
