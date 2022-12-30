import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Walk, WalkUtil} from "../model/Walk";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class WalksService {

  constructor(
    private httpClient: HttpClient
  ) { }

  addWalk(walk: NgForm): Observable<any> {
    return this.httpClient.post<Walk>(environment.restUrl + '/api/dog/walks', walk.value)
  }

  getWalks(): Observable<Array<Walk>> {
    return this.httpClient.get<Array<Walk>>(environment.restUrl + '/api/dog/walks').pipe(
      map(
        data => {
          const walks = new Array<Walk>()
          data.forEach(walk => walks.push(WalkUtil.fromHttp(walk)))
          return walks
        }
      )
    )
  }
}
