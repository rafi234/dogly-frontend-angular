import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {DogPark} from "../model/DogPark";
import {environment} from "../../environments/environment";
import {map, Observable, of} from "rxjs";
import {Meeting} from "../model/Meeting";

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(private httpClient: HttpClient) {
  }

  getMeetings(): Observable<Array<Meeting>> {
    return this.httpClient.get<Array<Meeting>>(environment.restUrl + '/api/meetings').pipe(
      map(
        data => {
          const meetings = new Array<Meeting>()
          data.forEach(meeting => meetings.push(Meeting.fromHttp(meeting, meeting.date, meeting.addedAt)))
          meetings.forEach(m => console.log(m.date))
          return meetings
        }
      )
    )
  }

  getDogParks(): Observable<Array<DogPark>> {
    let parks
    return this.httpClient.get<Array<DogPark>>(environment.restUrl + '/api/dog/park').pipe(
      map(data => {
          parks = new Array<DogPark>()
          data.forEach(park => parks.push(DogPark.fromHttp(park)))
          return parks
        }
      )
    )
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    const newMeeting = {
      "title": meeting.title,
      "description": meeting.description,
      "date": meeting.date,
      "dogPark": {
        "id": meeting.dogPark?.id,
        "url": meeting.dogPark?.url,
        "type": meeting.dogPark?.type,
        "city": meeting.dogPark?.city,
        "location": meeting.dogPark?.location,
        "voivodeship": meeting.dogPark?.voivodeship,
        "imgUrl": meeting.dogPark?.imgUrl
      }
    }
    console.log(newMeeting)
    return this.httpClient.post<Meeting>(environment.restUrl + '/api/meetings', newMeeting)
  }


  //TODO: needs authenticated user
  action(id: string, action: string): Observable<any> {
    return this.httpClient.put(environment.restUrl + '/api/meetings/' + id + '/action?action=' + action, null)
  }
}
